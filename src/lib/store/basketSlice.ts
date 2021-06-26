import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IBasket } from './Products';

export const basketAdapter = createEntityAdapter<IBasket>();

export const basketSlice = createSlice({
  name: 'basket',
  initialState: basketAdapter.getInitialState(),
  reducers: {
    addedToBasket(state, action) {
      basketAdapter.addOne(state, action.payload);
    },
    deletedFromBasket(state, action) {
      basketAdapter.removeOne(state, action.payload);
    },
  },
});

export const basketReducer = basketSlice.reducer;
