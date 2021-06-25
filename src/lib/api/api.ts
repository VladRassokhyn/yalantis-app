import axios from "axios";
import { ResponseGetProduct, ResponseGetProducts } from "../types";
import env from 'react-dotenv';
import { APP_ENDPOINTS } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: env.BASE_API_URL
});

export const getProducts = async (page: number, perPage: number): Promise<ResponseGetProducts> => {
  return await axiosInstance.get(`${APP_ENDPOINTS.PRODUCTS.GET}?page=${page}&perPage=${perPage}`);
};

export const getProduct = async (id: string): Promise<ResponseGetProduct> => {
  return await axiosInstance.get(`${APP_ENDPOINTS.PRODUCTS.GET}/${id}`);
};