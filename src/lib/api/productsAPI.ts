import {
  ResponseGetOrigins,
  ResponseGetProduct,
  ResponseGetProducts,
  TProductPostPayload,
  TReqProductsArgs,
} from '../types';
import { axiosInstance } from './axiosInstance';
import { APP_ENDPOINTS } from './endpoints';
import { makeRequestUrl } from './queryParams';

export const productsAPI = {
  getProducts: async (
    args?: TReqProductsArgs
  ): Promise<ResponseGetProducts> => {
    const filters = makeRequestUrl(args!);
    return await axiosInstance.get(`${APP_ENDPOINTS.PRODUCTS.GET}${filters}`);
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
};
