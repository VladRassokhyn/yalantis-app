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
import { axiosInstance } from './axiosInstance';
import { APP_ENDPOINTS } from './endpoints';


export const productsAPI = {
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
  }
};
