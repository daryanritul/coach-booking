import { BOOK_SEATS, CANCEL_BOOKING } from './actions.types';
import { initialState } from './store';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOK_SEATS:
      const { totalSeats, bookedSeats, myBookings } = state;
      const updatedSeats = [];

      // Return available seats in a given range
      const getAvailableSeats = (start = 1, end = totalSeats) => {
        const availableSeats = [];
        for (let seat = start; seat <= end; seat++) {
          if (!bookedSeats.includes(seat)) {
            availableSeats.push(seat);
          }
        }
        return availableSeats;
      };

      //  book seats row by row
      for (let row = 1; row <= Math.ceil(totalSeats / 7); row++) {
        const startSeat = (row - 1) * 7 + 1;
        const endSeat = Math.min(row * 7, totalSeats);
        const availableSeats = getAvailableSeats(startSeat, endSeat);
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
        }
      }

      // Book for available seats
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
