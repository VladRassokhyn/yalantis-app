import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";

const getProducts = createAsyncThunk(
  "products/getProducts",
  async (args: { page: number, perPage: number }) => {
    const res = await clientAPI.getProducts(args.page, args.perPage);
    return res.data;
  });

export const productsAdapter = createEntityAdapter({});

export const initialState = productsAdapter.getInitialState({
  status: "",
  page: 1,
  perPage: 10,
  totalItems: 1,
  items: [],
  error: '',
});


export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsSets(state, action) {
      state.items = action.payload;
    },
    currentPageChanged(state, action) {
      state.page = action.payload;
    },
    currentPerPageChanged(state, action) {
      state.perPage = action.payload;
    }
  },

  extraReducers: {
    [getProducts.pending.toString()]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled.toString()]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [getProducts.rejected.toString()]: (state, action) => {
      state.status = "error";
      state.error = action.err;
    }
  }
});

export const productsReducer = productsSlice.reducer