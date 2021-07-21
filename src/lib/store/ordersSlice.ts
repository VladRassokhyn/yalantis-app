import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { RequestStatuses, TInitialOrders, TNewOrder, TOrder } from '../types';
import { ordersAPI } from '../api/ordersAPI';

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

export const ordersAdapter = createEntityAdapter<TOrder>();

const initialState: TInitialOrders = {
  postStatus: RequestStatuses.IDLE,
  getOrdersStatus: RequestStatuses.IDLE,
  singleOrderStatus: RequestStatuses.IDLE,
  error: '',
  orders: ordersAdapter.getInitialState(),
  singleOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    postStatusResets: (state) => {
      state.postStatus = RequestStatuses.IDLE;
    },
  },
  extraReducers: {
    [postNewOrder.pending.toString()]: (state) => {
      state.postStatus = RequestStatuses.LOADING;
    },

    [postNewOrder.fulfilled.toString()]: (state) => {
      state.postStatus = RequestStatuses.SUCCESS;
    },

    [postNewOrder.rejected.toString()]: (state, action) => {
      state.postStatus = RequestStatuses.ERROR;
      state.error = action.err;
    },
    [getOrders.pending.toString()]: (state) => {
      state.getOrdersStatus = RequestStatuses.LOADING;
    },

    [getOrders.fulfilled.toString()]: (state, action) => {
      state.getOrdersStatus = RequestStatuses.SUCCESS;
      ordersAdapter.setAll(state.orders, action.payload.items);
    },

    [getOrders.rejected.toString()]: (state, action) => {
      state.getOrdersStatus = RequestStatuses.ERROR;
      state.error = action.err;
    },

    [getOrder.pending.toString()]: (state) => {
      state.singleOrderStatus = RequestStatuses.LOADING;
    },

    [getOrder.fulfilled.toString()]: (state, action) => {
      state.singleOrderStatus = RequestStatuses.SUCCESS;
      state.singleOrder = action.payload;
    },

    [getOrder.rejected.toString()]: (state, action) => {
      state.singleOrderStatus = RequestStatuses.ERROR;
      state.error = action.err;
    },
  },
});

export const ordersReducer = ordersSlice.reducer;

export const { postStatusResets } = ordersSlice.actions;
