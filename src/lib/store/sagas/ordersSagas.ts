import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getOrder, setError, setOrder, postNewOrder, postNewOrderSuccess } from '../ordersSlice';
import { ordersAPI } from '../../api/ordersAPI';

function* postNewOrderWorker(action: any): SagaIterator {
  try {
    yield call(ordersAPI.postOrder, action.payload.order);
    yield put({type: postNewOrderSuccess.type})
  } catch (err) {
    yield put({ type: setError.type, payload: err });
  }
}

function* getOrderWorker(action: any): SagaIterator {
  try {
    const res = yield call(ordersAPI.getOrder, action.payload.orderId)
    yield put({type: setOrder.type, payload: res.data})
  } catch (err) {
    yield put({ type: setError.type, payload: err });
  }
}

export function* ordersWatcher() {
  yield takeEvery(getOrder.type, getOrderWorker);
  yield takeEvery(postNewOrder.type, postNewOrderWorker)
}
