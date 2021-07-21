import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { TInitialOrders, TNewOrder, TOrder } from '../types';
import { ordersAPI } from '../api/ordersAPI';
import { RootState } from './store';

export const postNewOrder = createAsyncThunk(
  'orders/postNewOrder',
  async (order: TNewOrder) => {
    const res = await ordersAPI.postOrder(order);
    return res.data;
  }
);

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const res = await ordersAPI.getOrders();
  return res.data;
});

export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id: string) => {
    const res = await ordersAPI.getOrder(id);
    return res.data;
  }
);

const ordersAdapter = createEntityAdapter<TOrder>();

const initialState: TInitialOrders = {
  postStatus: '',
  getOrdersStatus: '',
  singleOrderStatus: '',
  error: '',
  orders: ordersAdapter.getInitialState(),
  singleOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    postStatusResets: (state) => {
      state.postStatus = '';
    },
  },
  extraReducers: {
    [postNewOrder.pending.toString()]: (state) => {
      state.postStatus = 'loading';
    },

    [postNewOrder.fulfilled.toString()]: (state) => {
      state.postStatus = 'success';
    },

    [postNewOrder.rejected.toString()]: (state, action) => {
      state.postStatus = 'error';
      state.error = action.err;
    },
    [getOrders.pending.toString()]: (state) => {
      state.getOrdersStatus = 'loading';
    },

    [getOrders.fulfilled.toString()]: (state, action) => {
      state.getOrdersStatus = 'success';
      ordersAdapter.setAll(state.orders, action.payload.items);
    },

    [getOrders.rejected.toString()]: (state, action) => {
      state.getOrdersStatus = 'error';
      state.error = action.err;
    },

    [getOrder.pending.toString()]: (state) => {
      state.singleOrderStatus = 'loading';
    },

    [getOrder.fulfilled.toString()]: (state, action) => {
      state.singleOrderStatus = 'success';
      state.singleOrder = action.payload;
    },

    [getOrder.rejected.toString()]: (state, action) => {
      state.singleOrderStatus = 'error';
      state.error = action.err;
    },
  },
});

export const ordersReducer = ordersSlice.reducer;

export const { postStatusResets } = ordersSlice.actions;

export const { selectById, selectIds } = ordersAdapter.getSelectors<RootState>(
  (state) => state.orders.orders
);

export const selectOrdersOptions = (state: RootState) => ({
  postStatus: state.orders.postStatus,
  getOrdersStatus: state.orders.getOrdersStatus,
  singleOrder: state.orders.singleOrder,
  singleOrderStatus: state.orders.singleOrderStatus,
});
