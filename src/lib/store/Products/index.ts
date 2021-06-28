import { ProductsReducer, productState } from './reducer';
import { IProduct, IBasket } from './types';
import { ProductStateContext, ProductDispatchContext } from './context';
import { useProductsContext, useProductsDispatch, useProductsState } from './hooks';
import {
  addProductToBasket,
  setIsLoading,
  setProducts,
  setCurrentPage,
  stProductPerPage,
} from './actions';

export {
  productState,
  useProductsState,
  useProductsDispatch,
  useProductsContext,
  ProductStateContext,
  ProductDispatchContext,
  addProductToBasket,
  stProductPerPage,
  setCurrentPage,
  setProducts,
  setIsLoading,
  ProductsReducer,
};
export type { IProduct, IBasket };
