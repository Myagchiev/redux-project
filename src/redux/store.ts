import { configureStore, Middleware } from '@reduxjs/toolkit';
import cartReducer, { cartMiddleware, CartState } from './cartSlice';

interface AppState {
  cart: CartState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = AppState;