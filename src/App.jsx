import React from 'react';
import Coach from './screens/Coach/Coach';
import Booking from './screens/Bookings/Booking';

const App = () => {
  return (
    <div className="app-container">
      <Booking />
      <Coach />
    </div>
  );
};

export default App;
