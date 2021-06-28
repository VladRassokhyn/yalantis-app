import { configureStore } from '@reduxjs/toolkit';
import { basketReducer } from './basketSlice';
import { notificationReducer } from './notoficationSlice';
import { productsReducer } from './productsSlice';
import { singleProductReducer } from "./singleProductSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    notification: notificationReducer,
    singleProduct: singleProductReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
