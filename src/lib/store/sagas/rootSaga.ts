import { all } from 'redux-saga/effects';
import { getOrderWatcher } from './ordersSagas';
import { getProductsWatcher } from './productSaga';

export function* rootSaga() {
  yield all([
    getProductsWatcher(),
    getOrderWatcher(),
  ]);
}