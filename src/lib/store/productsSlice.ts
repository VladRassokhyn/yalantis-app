import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";
import { IProduct, TInitialProducts, TReqProductsArgs } from "../types";
import { RootState } from "./store";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (args: TReqProductsArgs) => {
    const res = await clientAPI.getProducts(args);
    return res.data;
  }
);

export const productsAdapter = createEntityAdapter<IProduct>();

export const initialState: TInitialProducts = {
  status: "",
  page: 1,
  perPage: 10,
  totalItems: 1,
  items: productsAdapter.getInitialState(),
  error: null,
  origins: [],
  filterOrigins: null,
  minPrice: 0,
  maxPrice: 1000,
  filterPrice: {
    min: 0,
    max: 1000
  }
};

export const { selectById, selectIds } =
  productsAdapter.getSelectors<RootState>((state) => state.products.items);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    currentPageChanged(state, action) {
      state.page = action.payload;
    },
    currentPerPageChanged(state, action) {
      state.page = 1;
      state.perPage = action.payload;
    },
    originsChanged(state, action) {
      state.page = 1;
      state.filterOrigins = [];
      action.payload.forEach((origin: { label: string, value: string }) => {
        state.filterOrigins && state.filterOrigins.push(origin.value);
      });
    },
    priceFilterChanged(state, action) {
      state.filterPrice.min = action.payload.min;
      state.filterPrice.max = action.payload.max;
    }
  },

  extraReducers: {

    [getProducts.pending.toString()]: (state) => {
      state.status = "loading";
    },

    [getProducts.fulfilled.toString()]: (state, action) => {
      state.status = "success";
      state.totalItems = action.payload.totalItems;
      action.payload.items.forEach((item: IProduct) => {
        if (!state.origins.includes(item.origin)) {
          state.origins.push(item.origin);
        }
      });
      /*action.payload.items.forEach((item: IProduct) => {
        if (item.price > state.maxPrice) state.maxPrice = item.price;
        if (item.price < state.minPrice) state.minPrice = item.price
      })*/
      productsAdapter.setAll(state.items, action.payload.items);
    },

    [getProducts.rejected.toString()]: (state, action) => {
      state.status = "error";
      state.error = action.err;
    }
  }
});

export const productsReducer = productsSlice.reducer;

export const {
  currentPageChanged,
  currentPerPageChanged,
  originsChanged,
  priceFilterChanged
} = productsSlice.actions;

export const selectProductsOptions = (state: RootState) => ({
  page: state.products.page,
  perPage: state.products.perPage,
  totalItems: state.products.totalItems,
  status: state.products.status,
  origins: state.products.origins,
  filterOrigins: state.products.filterOrigins,
  minPrice: state.products.minPrice,
  maxPrice: state.products.maxPrice,
  filterPrice: state.products.filterPrice
});
