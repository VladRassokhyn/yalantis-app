import { ProductsReducer, productState } from "./reducer";
import { IProduct, IBasket } from "./types";
import { ProductStateContext, ProductDispatchContext } from "./context";
import { useProductsContext } from "./hooks";
import {
  addProductToBasket,
  setIsLoading,
  setProducts,
  setCurrentPage,
  stProductPerPage
} from "./actions";

export {
  productState,
  useProductsContext,
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