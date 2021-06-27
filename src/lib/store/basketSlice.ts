import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IBasket, IProduct } from "../types";
import { RootState } from "./store";

export const basketAdapter = createEntityAdapter<IBasket>();

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: basketAdapter.getInitialState()
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addedToBasket(state, action: { type: string; payload: IProduct }) {
      const product = state.items.entities[action.payload.id];
      if (product) {
        product.count++;
        state.totalCount++;
        state.totalPrice += action.payload.price;
      } else {
        basketAdapter.addOne(state.items, { ...action.payload, count: 1 });
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
    changedItemCount(state, action) {
      const product = state.items.entities[action.payload.id];
      if (product) {
        state.totalCount += action.payload.count - product.count;
        state.totalPrice += product.price * action.payload.count - product.price * product.count;
        product.count = action.payload.count;
      }
    }
  }
});

export const basketReducer = basketSlice.reducer;

export const { addedToBasket, deletedFromBasket, changedItemCount } = basketSlice.actions;

export const { selectIds, selectById } = basketAdapter.getSelectors<RootState>(
  (state) => state.basket.items
);

export const selectBasketOptions = (state: RootState) => ({
  totalPrice: state.basket.totalPrice,
  totalCount: state.basket.totalCount
});
