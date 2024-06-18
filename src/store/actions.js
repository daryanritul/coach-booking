import { BOOK_SEATS, CANCEL_BOOKING } from './actions.types';

export const bookSeats = seats => dispatch => {
  dispatch({
    type: BOOK_SEATS,
    payload: seats,
  });
};

export const cancelBooking = data => dispatch => {
  dispatch({
    type: CANCEL_BOOKING,
    payload: data,
  });
};
