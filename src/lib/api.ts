import axios from "axios";
import { ResponseGetProduct, ResponseGetProducts } from "./types";

const axiosInstance = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1/"
});

export const getProducts = async (page: number, perPage: number): Promise<ResponseGetProducts> => {
  return await axiosInstance.get(`/products?page=${page}&perPage=${perPage}`);
};

export const getProduct = async (id: string): Promise<ResponseGetProduct> => {
  return await axiosInstance.get(`/products/${id}`);
};