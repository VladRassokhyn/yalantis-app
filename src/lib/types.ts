import { IProduct } from "./store/Products"

export type ResponseGetProducts = {data: {items: IProduct[], totalItems: number}}
export type ResponseGetProduct = {data: IProduct}
