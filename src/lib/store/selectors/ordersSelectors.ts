import { ordersAdapter } from '../ordersSlice';
import { RootState } from '../store';

export const { selectById, selectIds } = ordersAdapter.getSelectors<RootState>(
  (state) => state.orders.orders
);

export const selectOrdersOptions = (state: RootState) => ({
  postStatus: state.orders.postStatus,
  getOrdersStatus: state.orders.getOrdersStatus,
  singleOrder: state.orders.singleOrder,
  singleOrderStatus: state.orders.singleOrderStatus,
});
