import { Reducer } from "react";
import {
  Actions,
  ActionTypes,
  TAddProductToBasket,
  IProduct,
  TProductState,
  TSetCurrentPage,
  TSetIsLoading,
  TSetProducts
} from "../types";

export const productState: TProductState = {
  isLoading: false,
  page: 1,
  perPage: 9,
  totalItems: 1,
  items: [],
  basketItems: []
};

export const ProductsReducer: Reducer<TProductState, Actions> = (state = productState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        ...state,
        items: [...action.items],
        totalItems: action.totalItems
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
      if (state.basketItems.find(item => item.id === action.product.id)) {
        return {
          ...state,
          basketItems: state.basketItems.map(item => {
            if (item.id === action.product.id) {
              return { ...item, count: item.count + 1 }
            } else {
              return item
            }
          })
        };
      } else {
          return {
            ...state, basketItems: [...state.basketItems, {...action.product, count: 1}]
          }
        }
    default:
      return state;
  }
};

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
export const setIsLoading = (isLoading: boolean): TSetIsLoading => ({ type: ActionTypes.SET_IS_LOADING, isLoading });