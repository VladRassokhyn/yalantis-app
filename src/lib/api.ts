import axios from "axios";
import { TProduct } from "./types";

const axiosInstanse = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/'
})

export const getProducts = async (page: number, perPage: number): Promise<{data: {items: TProduct[]}}> => {
  return await axiosInstanse.get(`/products?page=${page}&perPage=${perPage}`);
}