import { all } from 'redux-saga/effects';
import { getProductsWatcher } from './productSaga';

export function* rootSaga() {
  yield all([
    getProductsWatcher(),

  ]);
}