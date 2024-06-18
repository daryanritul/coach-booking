import { useReducer } from 'react';
import App from './App';
import reducer from './store/reducer';
import { context, initialState } from './store/store';
import './scss/global.scss';

const RootApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <App />
    </context.Provider>
  );
};

export default RootApp;
