import { Actions, ActionTypes, TAddProductToBasket, TProduct, TProductState, TSetCurrentPage,
  TSetIsLoading, TSetProducts } from "../types";
import { Reducer } from "react";

export const productState: TProductState = {
  isLoading: false,
  page: 1,
  perPage: 10,
  totalItems: null,
  items: [],
  basketItems: []
};

export const ProductsReducer: Reducer<TProductState, Actions> = (state = productState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        items: [...action.items]
      };
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page
      };
    case ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
      case ActionTypes.ADD_PRODUCT_TO_BASKET:
      return {
        ...state, basketItems: [...state.basketItems, action.product]
      }
    default:
      return state;
  }
};

export const addProductToBasket = (product: TProduct): TAddProductToBasket => ({type: ActionTypes.ADD_PRODUCT_TO_BASKET, product})
export const setProducts = (items: TProduct[]): TSetProducts => ({ type: ActionTypes.SET_PRODUCTS, items });
export const setCurrentPage = (page: number): TSetCurrentPage => ({ type: ActionTypes.SET_CURRENT_PAGE, page });
export const setIsLoading = (isLoading: boolean): TSetIsLoading => ({ type: ActionTypes.SET_IS_LOADING, isLoading });