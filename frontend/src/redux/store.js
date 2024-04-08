import { configureStore } from '@reduxjs/toolkit';

import authReducer from './athu';
import proReducer from './product'
import orderReducer from './order'


const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    pro: proReducer
  },
});

export default store;
