import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { clientAPI } from '../api/api';
import { IProduct, IInitialProducts, TOrigin, TProductPostPayload, TReqProductsArgs } from '../types';
import { RootState } from './store';


export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (args: TReqProductsArgs) => {
    const res = await clientAPI.getProducts(args);
    return res.data;
  }
);

export const getOrigins = createAsyncThunk(
  'products/getOrigins',
  async () => {
    const res = await clientAPI.getOrigins();
    return res.data.items;
  }
);

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (product: TProductPostPayload) => {
    const res = await clientAPI.postNewProduct(product);
    return res.data;
  }
);
export const updateProduct = createAsyncThunk(
  'products/postProduct',
  async (args: {product: TProductPostPayload, id: string}) => {
    const res = await clientAPI.updateProduct(args.id, args.product);
    return res.data;
  }
);

const productsAdapter = createEntityAdapter<IProduct>();

export const initialState: IInitialProducts = {
  status: '',
  statusOrigins: '',
  newProductStatus: '',
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

export const productsSlice = createSlice({
  name: 'products',
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
      action.payload.forEach((origin: TOrigin) => {
        state.filterOrigins && state.filterOrigins.push(origin);
      });
    },
    priceFilterChanged(state, action) {
      state.page = 1;
      state.filterPrice.min = action.payload.min;
      state.filterPrice.max = action.payload.max;
    },
    allFiltersResets(state) {
      state.filterOrigins = null;
      state.perPage = 10;
      state.page = 1;
      state.filterPrice = { min: 0, max: 1000 };
    },
    statusResets(state, action) {
      const status = action.payload
      state[status] = '';
    }
  },

  extraReducers: {
    [getProducts.pending.toString()]: (state) => {
      state.status = 'loading';
    },

    [getProducts.fulfilled.toString()]: (state, action) => {
      state.status = 'success';
      state.totalItems = action.payload.totalItems;
      productsAdapter.setAll(state.items, action.payload.items);
    },

    [getProducts.rejected.toString()]: (state, action) => {
      state.status = 'error';
      state.error = action.err;
    },

    [getOrigins.pending.toString()]: (state) => {
      state.statusOrigins = 'loading';
    },

    [getOrigins.fulfilled.toString()]: (state, action) => {
      state.statusOrigins = 'success';
      state.origins = action.payload;
    },

    [getOrigins.rejected.toString()]: (state, action) => {
      state.statusOrigins = 'error';
      state.error = action.err;
    },

    [postProduct.pending.toString()]: (state) => {
      state.newProductStatus = 'loading';
    },

    [postProduct.fulfilled.toString()]: (state) => {
      state.newProductStatus = 'success';
    },

    [postProduct.rejected.toString()]: (state, action) => {
      state.newProductStatus = 'error';
      state.error = action.err;
    },

    [updateProduct.pending.toString()]: (state) => {
      state.newProductStatus = 'loading';
    },

    [updateProduct.fulfilled.toString()]: (state) => {
      state.newProductStatus = 'success';

    },

    [updateProduct.rejected.toString()]: (state, action) => {
      state.newProductStatus = 'error';
      state.error = action.err;
    }
  }
});

export const productsReducer = productsSlice.reducer;


export const { selectById, selectIds } =
  productsAdapter.getSelectors<RootState>((state) => state.products.items);

export const {
  currentPageChanged,
  currentPerPageChanged,
  originsChanged,
  priceFilterChanged,
  allFiltersResets,
  statusResets,
} = productsSlice.actions;

export const selectProductsOptions = (state: RootState) => ({
  page: state.products.page,
  perPage: state.products.perPage,
  totalItems: state.products.totalItems,
  status: state.products.status,
  statusOrigins: state.products.statusOrigins,
  newProductStatus: state.products.newProductStatus,
  origins: state.products.origins,
  filterOrigins: state.products.filterOrigins,
  minPrice: state.products.minPrice,
  maxPrice: state.products.maxPrice,
  filterPrice: state.products.filterPrice
});
