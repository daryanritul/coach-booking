import { createContext } from 'react';
import { generateRandomNumbers } from '../utils/utils';

export const context = createContext();

export const initialState = {
  totalSeats: 80,
  bookedSeats: generateRandomNumbers(10, 1, 80),
  myBookings: [],
};
