import { ProductsReducer, productState } from "./reducer";
import { IProduct, IBasket } from "./types";
import { ProductStateContext, ProductDispatchContext } from "./context";
import { useProductsState, useProductsDispatch } from "./hooks";
import {
  addProductToBasket,
  setIsLoading,
  setProducts,
  setCurrentPage,
  stProductPerPage
} from "./actions";

export {
  productState,
  useProductsState,
  useProductsDispatch,
  ProductStateContext,
  ProductDispatchContext,
  addProductToBasket,
  stProductPerPage,
  setCurrentPage,
  setProducts,
  setIsLoading,
  ProductsReducer
};
export type {
  IProduct,
  IBasket
};