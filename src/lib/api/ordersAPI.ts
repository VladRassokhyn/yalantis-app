import {
  ResponseGetOrder,
  ResponseGetOrders,
  ResponsePostNewOrder,
  TNewOrder,
} from '../types';
import { axiosInstance } from './axiosInstance';
import { APP_ENDPOINTS } from './endpoints';

export const ordersAPI = {
  postOrder: async (order: TNewOrder): Promise<ResponsePostNewOrder> => {
    return await axiosInstance.post(APP_ENDPOINTS.ORDERS.POST, order);
  },

  getOrders: async (): Promise<ResponseGetOrders> => {
    return await axiosInstance.get(APP_ENDPOINTS.ORDERS.POST);
  },

  getOrder: async (id: string): Promise<ResponseGetOrder> => {
    return await axiosInstance.get(`${APP_ENDPOINTS.ORDERS.GET}/${id}`);
  },
};
