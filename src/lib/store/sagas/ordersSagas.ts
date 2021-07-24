import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getOrder, setError, setOrder } from '../ordersSlice';
import { ordersAPI } from '../../api/ordersAPI';


function* getOrderWorker(action: any): SagaIterator {
  try {
    const res = yield call(ordersAPI.getOrder, action.payload.orderId)
    yield put({type: setOrder.type, payload: res.data})
  } catch (err) {
    yield put({ type: setError.type, payload: err });
  }
}

export function* getOrderWatcher() {
  yield takeEvery(getOrder.type, getOrderWorker);
}
