import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './RootApp.jsx';
import './scss/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
