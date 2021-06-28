import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { clientAPI } from '../api/api';
import { TSingleProductState } from "../types";
import { RootState } from "./store";

export const getSingleProduct = createAsyncThunk(
  'singleProduct/getSingleProduct',
  async (id: string) => {
    const res = await clientAPI.getProduct(id);
    return res.data;
  }
);

export const initialState: TSingleProductState = {
  status: '',
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
  }
};


export const singleProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: {
    [getSingleProduct.pending.toString()]: (state) => {
      state.status = 'loading';
    },

    [getSingleProduct.fulfilled.toString()]: (state, action) => {
      state.status = 'success';
      state.product = action.payload;
    },

    [getSingleProduct.rejected.toString()]: (state, action) => {
      state.status = 'error';
      state.error = action.err;
    },
  },
});

export const singleProductReducer = singleProductSlice.reducer;

export const selectSingleProduct = (state: RootState) => ({
  product: state.singleProduct.product,
  status: state.singleProduct.status
});
