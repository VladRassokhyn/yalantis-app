import { RootState } from '../store';
import { basketAdapter, toOrderAdapter } from '../basketSlice';

export const { selectIds, selectById } = basketAdapter.getSelectors<RootState>(
  (state) => state.basket.items
);

export const { selectAll } = toOrderAdapter.getSelectors<RootState>(
  (state) => state.basket.toOrder
);

export const selectBasketOptions = (state: RootState) => ({
  totalPrice: state.basket.totalPrice,
  totalCount: state.basket.totalCount,
});
