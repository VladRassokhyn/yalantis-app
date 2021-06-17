import axios from "axios";
import { ResponseGetProducts } from "./types";

const axiosInstanse = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/'
})

export const getProducts = async (page: number, perPage: number): Promise<ResponseGetProducts> => {
  return await axiosInstanse.get(`/products?page=${page}&perPage=${perPage}`);
}