import React, { useContext } from 'react';
import sty from './Seats.module.scss';
import { context } from '../../store/store';

const Seats = ({ number }) => {
  const { state } = useContext(context);

  const isSeatBooked = i => {
    for (const booking of state.myBookings) {
      if (booking.seats.includes(i)) {
        return true;
      }
    }
    return false;
  };

  const getSeatStatus = i => {
    if (isSeatBooked(i)) return sty.mySeat;
    if (state.bookedSeats.includes(i)) return sty.booked;
    else sty.available;
  };
  return (
    <div className={`${sty.seats} ${getSeatStatus(number)}`}>{number}</div>
  );
};

export default Seats;
