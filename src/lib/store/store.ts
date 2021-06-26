import { configureStore } from '@reduxjs/toolkit';
import { basketReducer } from './basketSlice';
import { productsReducer } from './productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
