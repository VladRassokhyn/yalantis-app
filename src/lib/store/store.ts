import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { basketReducer } from './basketSlice';
import { notificationReducer } from './notoficationSlice';
import { ordersReducer } from './ordersSlice';
import { productsReducer } from './productsSlice';
import { singleProductReducer } from './singleProductSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    notification: notificationReducer,
    singleProduct: singleProductReducer,
    orders: ordersReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
