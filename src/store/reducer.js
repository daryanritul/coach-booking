import { BOOK_SEATS, CANCEL_BOOKING } from './actions.types';
import { initialState } from './store';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOK_SEATS:
      const { totalSeats, bookedSeats, myBookings } = state;
      const updatedSeats = []; //to store bookedSeats

      // Return available seats in a given range
      const getAvailableSeats = (start = 1, end = totalSeats) => {
        let availableSeats = [];
        for (let seat = start; seat <= end; seat++) {
          if (!bookedSeats.includes(seat)) {
            availableSeats.push(seat);
          }
        }
        return availableSeats;
      };
      // to get the available seats togather in a row
      const getAvailableSeatsInSeq = (start = 1, end = totalSeats) => {
        let availableSeats = [];
        for (let seat = start; seat <= end; seat++) {
          if (availableSeats.length >= payload) {
            return availableSeats;
          }
          if (bookedSeats.includes(seat)) {
            availableSeats = [];
          } else {
            availableSeats.push(seat);
          }
        }
        return availableSeats;
      };

      //  book seats row by row
      let seatsBackup = []; // store seats backup if not found in sequencially;
      for (let row = 1; row <= Math.ceil(totalSeats / 7); row++) {
        const startSeat = (row - 1) * 7 + 1;
        const endSeat = Math.min(row * 7, totalSeats);
        const nonSeqSeats = getAvailableSeats(startSeat, endSeat);
        const availableSeats = getAvailableSeatsInSeq(startSeat, endSeat);

        if (nonSeqSeats.length >= payload && seatsBackup.length <= 0) {
          // push only one time
          seatsBackup.push(...nonSeqSeats.slice(0, payload));
        }
        if (availableSeats.length >= payload) {
          // book in a single row with sequence
          updatedSeats.push(...availableSeats.slice(0, payload));
          return {
            ...state,
            bookedSeats: [...bookedSeats, ...updatedSeats],
            myBookings: [
              ...myBookings,
              {
                noOfSeats: updatedSeats.length,
                seats: updatedSeats,
                bookTime: Date.now(),
              },
            ],
          };
        }
      }
      //Book in a single row without sequence
      if (seatsBackup.length > 0) {
        return {
          ...state,
          bookedSeats: [...bookedSeats, ...seatsBackup],
          myBookings: [
            ...myBookings,
            {
              noOfSeats: seatsBackup.length,
              seats: seatsBackup,
              bookTime: Date.now(),
            },
          ],
        };
      }
      // Book for throught available seats
      const availableSeats = getAvailableSeats();
      if (availableSeats.length >= payload) {
        updatedSeats.push(...availableSeats.slice(0, payload));
        return {
          ...state,
          bookedSeats: [...bookedSeats, ...updatedSeats],
          myBookings: [
            ...myBookings,
            {
              noOfSeats: updatedSeats.length,
              seats: updatedSeats,
              bookTime: Date.now(),
            },
          ],
        };
      } else
        return {
          ...state,
        };

    case CANCEL_BOOKING:
      const updatedList = state.bookedSeats.filter(
        seat => !payload.seats.includes(seat)
      );
      const updateMySeats = state.myBookings.filter(
        booking => booking.bookTime !== payload.bookTime
      );
      return {
        ...state,
        bookedSeats: updatedList,
        myBookings: updateMySeats,
      };
    default:
      return state;
  }
};
