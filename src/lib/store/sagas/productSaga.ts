import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { productsAPI } from '../../api/productsAPI';
import {
  setProducts,
  setFilters,
  setError,
  getProducts,
  setOrigins,
  currentPerPageChanged,
  currentPageChanged,
  originsChanged,
  priceFilterChanged
} from '../productsSlice';
import { updateQueryParams } from '../../api/queryParams';
function* getProductsWorker(action: any): SagaIterator {
  try {
    action.payload = updateQueryParams(action.payload);

    const products = yield call(productsAPI.getProducts, action.payload);
    const origins = yield call(productsAPI.getOrigins);
    yield put({ type: setFilters.type, payload: {...action.payload} });
    yield put({ type: setProducts.type, payload: products.data });
    yield put({ type: setOrigins.type, payload: origins.data.items });
  } catch (err) {
    yield put({ type: setError.type, payload: err });
  }
}

export function* getProductsWatcher() {
  yield takeEvery(getProducts.type, getProductsWorker);
  yield takeEvery(currentPerPageChanged.type, getProductsWorker);
  yield takeEvery(currentPageChanged.type, getProductsWorker);
  yield takeEvery(originsChanged.type, getProductsWorker);
  yield takeEvery(priceFilterChanged.type, getProductsWorker);
}
