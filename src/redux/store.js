// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { cartMiddleware } from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
