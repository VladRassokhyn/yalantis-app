import {
  ActionTypes,
  IProduct,
  TAddProductToBasket,
  TSetCurrentPage, TSetIsLoading,
  TSetProducts,
  TSetProductsPerPage
} from "./types";

export const addProductToBasket = (product: IProduct): TAddProductToBasket => ({
  type: ActionTypes.ADD_PRODUCT_TO_BASKET,
  product
});

export const setProducts = (items: IProduct[], totalItems: number): TSetProducts => ({
  type: ActionTypes.SET_PRODUCTS,
  items,
  totalItems
});

export const setCurrentPage = (page: number): TSetCurrentPage => ({ type: ActionTypes.SET_CURRENT_PAGE, page });
export const stProductPerPage = (perPage: number): TSetProductsPerPage => ({ type: ActionTypes.SET_PRODUCTS_PER_PAGE, perPage });
export const setIsLoading = (isLoading: boolean): TSetIsLoading => ({ type: ActionTypes.SET_IS_LOADING, isLoading });