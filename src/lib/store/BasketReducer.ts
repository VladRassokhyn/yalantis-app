import { ActionTypes, TBasketState, TProduct } from "../types";
import { Reducer } from "react";

export const BasketState: TBasketState = {
  items: []
};

export const BasketReducer: Reducer<TBasketState, Actions> = (state = BasketState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state, items: [...state.items, action.product]
      }
    default:
      return state;
  }
};

type Actions = TAddProduct

type TAddProduct = {type: ActionTypes.ADD_PRODUCT, product: TProduct}

export const addProduct = (product: TProduct): TAddProduct => ({type: ActionTypes.ADD_PRODUCT, product})