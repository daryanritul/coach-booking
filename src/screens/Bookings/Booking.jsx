import React, { useContext, useState } from 'react';
import sty from './Booking.module.scss';
import { bookSeats } from '../../store/actions';
import { context } from '../../store/store';
import SeatsCard from '../../Components/SeatsCard/SeatsCard';

const Booking = () => {
  const [seats, setSeats] = useState('');
  const { state, dispatch } = useContext(context);
  const [err, setErr] = useState(false);

  const bookTicketHandler = () => {
    let errMsg = false;
    if (!seats) {
      errMsg = 'Invalid Input';
    } else if (seats > 7 || seats < 0) {
      errMsg = 'You can only book 7 seats at a  time';
    } else if (state.totalSeats === state.bookedSeats.length) {
      errMsg = 'Sorry! Seats Full';
    } else if (seats > state.totalSeats - state.bookedSeats.length) {
      errMsg = 'Not Enough Seats Available';
    }
    if (errMsg) {
      setErr(errMsg);
      setTimeout(() => {
        setErr(false);
      }, 5000);
      setSeats('');
      return;
    }
    bookSeats(seats)(dispatch);
    setSeats('');
  };

  return (
    <div className={sty.booking}>
      <div className={sty.label}>
        <h2> Coach Reservation</h2>
        <small>
          Seats available{' '}
          <strong>({state.totalSeats - state.bookedSeats.length})</strong>
        </small>
      </div>
      <div className={sty.bookingForm}>
        <input
          type="number"
          max={7}
          min={1}
          placeholder="Enter number of seats to book"
          value={seats}
          onChange={event => setSeats(event.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') bookTicketHandler();
          }}
        />
        <button onClick={() => bookTicketHandler()}>Book Tickets</button>
        {err && <small className={sty.err}>{err}</small>}
      </div>
      <div className={sty.mySeats}>
        <h4>My Bookings({state.myBookings.length})</h4>
        {state.myBookings.length ? (
          state.myBookings
            .toReversed()
            .map((data, index) => <SeatsCard data={data} key={index} />)
        ) : (
          <div className={sty.emptyList}>
            <small>Booking List is Empty</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
