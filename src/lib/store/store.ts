import { configureStore } from '@reduxjs/toolkit';
import { basketReducer } from './basketSlice';
import { notificationReducer } from './notoficationSlice';
import { productsReducer } from './productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
