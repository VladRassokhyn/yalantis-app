import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IBasket, IProduct, TInitialBasket, TNewOrderPiece } from '../types';
import { RootState } from './store';

const basketAdapter = createEntityAdapter<IBasket>();
const toOrderAdapter = createEntityAdapter<TNewOrderPiece>({
  selectId: (order) => order.productId
})

const initialState: TInitialBasket = {
  totalPrice: 0,
  totalCount: 0,
  items: basketAdapter.getInitialState(),
  toOrder: toOrderAdapter.getInitialState()
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addedToBasket(state, action: { type: string; payload: IProduct }) {
      const product = state.items.entities[action.payload.id];
      const orderPiece = state.toOrder.entities[action.payload.id]
      if (product) {
        product.count++;
        state.totalCount++;
        state.totalPrice += action.payload.price;
        if (orderPiece) orderPiece.count++
      } else {
        basketAdapter.addOne(state.items, { ...action.payload, count: 1 });
        if (!orderPiece) toOrderAdapter.addOne(state.toOrder, {productId: action.payload.id, count: 1})
        state.totalCount++;
        state.totalPrice += action.payload.price;
      }
    },
    deletedFromBasket(state, action) {
      const product = state.items.entities[action.payload.id];
      if (product) {
        state.totalPrice -= product.count * product.price;
        state.totalCount -= product.count;
        basketAdapter.removeOne(state.items, action.payload.id);
      }
    },
    basketCleared(state) {
      state.totalCount = 0
      state.totalPrice = 0

      basketAdapter.removeAll(state.items)
    },
    changedItemCount(state, action) {
      const product = state.items.entities[action.payload.id];
      const orderPiece = state.toOrder.entities[action.payload.id]
      if (product && orderPiece) {
        state.totalCount += action.payload.count - product.count;
        state.totalPrice += product.price * action.payload.count - product.price * product.count;
        product.count = action.payload.count;
        orderPiece.count = product.count
      }
    },
  },
});

export const basketReducer = basketSlice.reducer;

export const { addedToBasket, deletedFromBasket, changedItemCount, basketCleared } =
  basketSlice.actions;

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
