import axios from 'axios';
import { ResponseGetProduct, ResponseGetProducts } from '../types';
import { APP_ENDPOINTS } from './endpoints';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const clientAPI = {
  getProducts: async (
    page: number,
    perPage: number
  ): Promise<ResponseGetProducts> => {
    return await axiosInstance.get(
      `${APP_ENDPOINTS.PRODUCTS.GET}?page=${page}&perPage=${perPage}`
    );
  },

  getProduct: async (id: string): Promise<ResponseGetProduct> => {
    return await axiosInstance.get(`${APP_ENDPOINTS.PRODUCTS.GET}/${id}`);
  }
};
