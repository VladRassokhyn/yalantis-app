import axios from 'axios';
import {
  ResponseGetOrder,
  ResponseGetOrders,
  ResponseGetOrigins,
  ResponseGetProduct,
  ResponseGetProducts,
  ResponsePostNewOrder,
  TNewOrder,
  TProductPostPayload,
  TReqProductsArgs,
} from '../types';
import { APP_ENDPOINTS } from './endpoints';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: process.env.REACT_APP_API_KEY,
  },
});

export const clientAPI = {
  getProducts: async (args: TReqProductsArgs): Promise<ResponseGetProducts> => {
    return await axiosInstance.get(
      `${APP_ENDPOINTS.PRODUCTS.GET}` +
        `?page=${args.page}` +
        `&perPage=${args.perPage}` +
        `&origins=${args.origins}` +
        `&minPrice=${args.minPrice}` +
        `&maxPrice=${args.maxPrice}` +
        `&editable=${args.editable}`
    );
  },

  getProduct: async (id: string): Promise<ResponseGetProduct> => {
    return await axiosInstance.get(`${APP_ENDPOINTS.PRODUCTS.GET}/${id}`);
  },

  getOrigins: async (): Promise<ResponseGetOrigins> => {
    return await axiosInstance.get(APP_ENDPOINTS.PRODUCTS_ORIGINS.GET);
  },

  postNewProduct: async (
    product: TProductPostPayload
  ): Promise<ResponseGetProduct> => {
    return await axiosInstance.post(APP_ENDPOINTS.PRODUCTS.POST, { product });
  },

  updateProduct: async (
    id: string,
    product: TProductPostPayload
  ): Promise<ResponseGetProduct> => {
    return await axiosInstance.patch(`${APP_ENDPOINTS.PRODUCTS.POST}/${id}`, {
      product,
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    return await axiosInstance.delete(`${APP_ENDPOINTS.PRODUCTS.DELETE}/${id}`);
  },

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
