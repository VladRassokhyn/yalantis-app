import { all } from 'redux-saga/effects';
import { ordersWatcher } from './ordersSagas';
import { getProductsWatcher } from './productSaga';

export function* rootSaga() {
  yield all([
    getProductsWatcher(),
    ordersWatcher(),
  ]);
}