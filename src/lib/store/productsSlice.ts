import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";
import { IProduct } from "./Products";
import { RootState } from "./store";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (args: { page: number; perPage: number }) => {
    const res = await clientAPI.getProducts(args.page, args.perPage);
    return res.data;
  }
);

export const productsAdapter = createEntityAdapter<IProduct>();

export const initialState = {
  status: "",
  page: 1,
  perPage: 10,
  totalItems: 1,
  items: productsAdapter.getInitialState(),
  error: null
};

export const {  selectById, selectIds } = productsAdapter.getSelectors<RootState>(
  (state) => state.products.items
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
      productsAdapter.setAll(state.items, action.payload.items);
      state.totalItems = action.payload.totalItems;
    },
    [getProducts.rejected.toString()]: (state, action) => {
      state.status = "error";
      state.error = action.err;
    }
  }
});

export const productsReducer = productsSlice.reducer;

export const { currentPageChanged, currentPerPageChanged } =
  productsSlice.actions;



export const selectProductsOptions = (state: RootState) => ({
  page: state.products.page,
  perPage: state.products.perPage,
  totalItems: state.products.totalItems,
  status: state.products.status
});
