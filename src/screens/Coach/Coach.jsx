import React, { useContext } from 'react';
import sty from './Coach.module.scss';
import { context } from '../../store/store';
import Seats from '../../Components/Seats/Seats';

const Coach = () => {
  const { state } = useContext(context);
  return (
    <div className={sty.coach}>
      <strong>Coach Seats Preview</strong>
      <div className={sty.coachLable}>
        <p className={sty.status}>My Seats</p>
        <p className={sty.status}>Booked</p>
        <p className={sty.status}>Available</p>
      </div>
      <div className={sty.coachSeats}>
        {[...Array(state.totalSeats)].map((seat, index) => (
          <Seats number={index + 1} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Coach;
