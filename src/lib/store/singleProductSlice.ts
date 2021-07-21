import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsAPI } from '../api/productsAPI';
import { RequestStatuses, TSingleProductState } from '../types';

export const getSingleProduct = createAsyncThunk(
  'singleProduct/getSingleProduct',
  async (id: string) => {
    const res = await productsAPI.getProduct(id);
    return res.data;
  }
);

export const initialState: TSingleProductState = {
  status: RequestStatuses.IDLE,
  error: '',
  product: {
    isEditable: false,
    id: '',
    name: '',
    price: 0,
    origin: '',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    photo: '',
  },
};

export const singleProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: {
    [getSingleProduct.pending.toString()]: (state) => {
      state.status = RequestStatuses.LOADING;
    },

    [getSingleProduct.fulfilled.toString()]: (state, action) => {
      state.status = RequestStatuses.SUCCESS;
      state.product = action.payload;
    },

    [getSingleProduct.rejected.toString()]: (state, action) => {
      state.status = RequestStatuses.ERROR;
      state.error = action.err;
    },
  },
});

export const singleProductReducer = singleProductSlice.reducer;


