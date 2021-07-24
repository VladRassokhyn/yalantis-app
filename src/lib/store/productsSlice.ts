import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { productsAPI } from '../api/productsAPI';
import {
  IProduct,
  IInitialProducts,
  TOrigin,
  TProductPostPayload,
  TReqProductsArgs,
  RequestStatuses,
} from '../types';

// Change logic according to HM#4

/*
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (args: TReqProductsArgs) => {
    const res = await productsAPI.getProducts(args);
    return res.data;
  }
);

export const getOrigins = createAsyncThunk('products/getOrigins', async () => {
  const res = await productsAPI.getOrigins();
  return res.data.items;
});
*/
export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (product: TProductPostPayload) => {
    const res = await productsAPI.postNewProduct(product);
    return res.data;
  }
);
export const updateProduct = createAsyncThunk(
  'products/patchProduct',
  async (args: { product: TProductPostPayload; id: string }) => {
    const res = await productsAPI.updateProduct(args.id, args.product);
    return res.data;
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await productsAPI.deleteProduct(id);
  }
);

export const productsAdapter = createEntityAdapter<IProduct>();

export const initialState: IInitialProducts = {
  initialised: false,
  status: RequestStatuses.IDLE,
  statusOrigins: RequestStatuses.IDLE,
  newProductStatus: RequestStatuses.IDLE,
  updateStatus: RequestStatuses.IDLE,
  deleteStatus: RequestStatuses.IDLE,
  page: 1,
  perPage: 50,
  totalItems: 1,
  items: productsAdapter.getInitialState(),
  error: null,
  newProductError: null,
  origins: [],
  filterOrigins: [],
  minPrice: 1,
  maxPrice: 1000,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    currentPageChanged(state, action) {
      state.page = action.payload;
    },
    currentPerPageChanged(state, action) {
      state.page = 1;
      state.perPage = action.payload.perPage;
    },
    originsChanged(state, action) {
      state.page = 1;
      state.filterOrigins = [];
      action.payload.origins.forEach((origin: TOrigin) => {
        state.filterOrigins && state.filterOrigins.push(origin.value);
      });
    },
    priceFilterChanged(state, action) {
      state.page = 1;
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    statusResets(state, action) {
      const status = action.payload;
      state[status] = RequestStatuses.IDLE;
    },
    getProducts(state, action) {
      state.status = RequestStatuses.LOADING;
    },
    setProducts(state, action) {
      state.status = RequestStatuses.SUCCESS;
      state.totalItems = action.payload.totalItems;
      productsAdapter.setAll(state.items, action.payload.items);
    },
    setFilters(state, action) {
      state.page = +action.payload.page;
      state.perPage = +action.payload.perPage;
      state.minPrice = +action.payload.minPrice;
      state.maxPrice = +action.payload.maxPrice;
      action.payload.origins.map((origin: string) => {
        if (origin !== '') {
          state.filterOrigins.push(origin);
        }
      });
    },
    clearFilters(state) {
      state.page = 1;
      state.perPage = 50;
      state.minPrice = 1;
      state.maxPrice = 1000;
      state.filterOrigins = [];
    },
    getOrigins(state) {
      state.statusOrigins = RequestStatuses.LOADING;
    },
    setOrigins(state, action) {
      state.statusOrigins = RequestStatuses.SUCCESS;
      state.origins = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },

  extraReducers: {
    // Change logic according to HM#4
    /*
    [getProducts.pending.toString()]: (state) => {
      state.status = RequestStatuses.LOADING;
    },

    [getProducts.fulfilled.toString()]: (state, action) => {
      state.status = RequestStatuses.SUCCESS;
      state.totalItems = action.payload.totalItems;
      productsAdapter.setAll(state.items, action.payload.items);
    },

    [getProducts.rejected.toString()]: (state, action) => {
      state.status = RequestStatuses.ERROR;
      state.error = action.err;
    },

    [getOrigins.pending.toString()]: (state) => {
      state.statusOrigins = RequestStatuses.LOADING;
    },

    [getOrigins.fulfilled.toString()]: (state, action) => {
      state.statusOrigins = RequestStatuses.SUCCESS;
      state.origins = action.payload;
    },

    [getOrigins.rejected.toString()]: (state, action) => {
      state.statusOrigins = RequestStatuses.ERROR;
      state.error = action.err;
    },
    */

    [postProduct.pending.toString()]: (state) => {
      state.newProductStatus = RequestStatuses.LOADING;
    },

    [postProduct.fulfilled.toString()]: (state) => {
      state.newProductStatus = RequestStatuses.SUCCESS;
    },

    [postProduct.rejected.toString()]: (state, action) => {
      state.newProductStatus = RequestStatuses.ERROR;
      state.error = action.err;
    },

    [updateProduct.pending.toString()]: (state) => {
      state.updateStatus = RequestStatuses.LOADING;
    },

    [updateProduct.fulfilled.toString()]: (state) => {
      state.updateStatus = RequestStatuses.SUCCESS;
    },

    [updateProduct.rejected.toString()]: (state, action) => {
      state.updateStatus = RequestStatuses.ERROR;
      state.error = action.err;
    },

    [deleteProduct.pending.toString()]: (state) => {
      state.deleteStatus = RequestStatuses.LOADING;
    },

    [deleteProduct.fulfilled.toString()]: (state) => {
      state.deleteStatus = RequestStatuses.SUCCESS;
    },

    [deleteProduct.rejected.toString()]: (state, action) => {
      state.deleteStatus = RequestStatuses.ERROR;
      state.error = action.err;
    },
  },
});

export const productsReducer = productsSlice.reducer;

export const {
  currentPageChanged,
  currentPerPageChanged,
  originsChanged,
  priceFilterChanged,
  statusResets,
  setProducts,
  setError,
  getProducts,
  setOrigins,
  setFilters,
  clearFilters,
} = productsSlice.actions;
