import axios from 'axios';
import {
  ResponseGetProduct,
  ResponseGetProducts,
  TReqProductsArgs,
} from '../types';
import { APP_ENDPOINTS } from './endpoints';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
};
