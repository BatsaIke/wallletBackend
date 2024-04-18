import { configureStore} from '@reduxjs/toolkit';

import {thunk} from 'redux-thunk'; 
import rootReducer from './redux/rootReducer';



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, 
    });

    return middleware.concat(thunk);
  },
});

// Initialize current state from the Redux store for subscription comparison


