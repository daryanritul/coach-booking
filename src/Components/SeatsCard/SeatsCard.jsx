import React, { useContext } from 'react';
import sty from './SeatsCard.module.scss';

import { context } from '../../store/store';
import { cancelBooking } from '../../store/actions';

const SeatsCard = ({ data }) => {
  const { dispatch } = useContext(context);
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <div className={sty.card}>
      <div className={sty.content}>
        <div className={sty.details}>
          <p>
            <strong>Number of Seats:</strong> {data.seats.length}
          </p>
          <p>
            <strong>Book Time:</strong> {formatDate(data.bookTime)}
          </p>
        </div>
        <div className={sty.seats}>
          <p>
            <strong>Booked Seat Numbers:</strong>
          </p>
          <div className={sty.seatNumbers}>
            {data.seats.map((seat, index) => (
              <span key={index} className={sty.seatNumber}>
                {seat}
              </span>
            ))}
          </div>
        </div>
        <button
          className={sty.cancelBook}
          onClick={() => cancelBooking(data)(dispatch)}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default SeatsCard;
