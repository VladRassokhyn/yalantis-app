import axios from 'axios';
import {
  ResponseGetOrigins,
  ResponseGetProduct,
  ResponseGetProducts, TProductPostPayload,
  TReqProductsArgs
} from '../types';
import { APP_ENDPOINTS } from './endpoints';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Authorization": process.env.REACT_APP_API_KEY
  }
});

export const clientAPI = {
  getProducts: async (args: TReqProductsArgs): Promise<ResponseGetProducts> => {
    return await axiosInstance.get(
      `${APP_ENDPOINTS.PRODUCTS.GET}` +
      `?page=${args.page}` +
      `&perPage=${args.perPage}` +
      `&origins=${args.origins}` +
      `&minPrice=${args.minPrice}` +
      `&maxPrice=${args.maxPrice}`
    );
  },

  getProduct: async (id: string): Promise<ResponseGetProduct> => {
    return await axiosInstance.get(`${APP_ENDPOINTS.PRODUCTS.GET}/${id}`);
  },

  getOrigins: async (): Promise<ResponseGetOrigins> => {
    return await axiosInstance.get(APP_ENDPOINTS.PRODUCTS_ORIGINS.GET);
  },

  postNowProduct: async (product: TProductPostPayload): Promise<ResponseGetProduct> => {
    return await axiosInstance.post(APP_ENDPOINTS.PRODUCTS.POST, {product});
  },
};
