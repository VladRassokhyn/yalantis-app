import { Reducer } from "react";
import {
  Actions,
  ActionTypes,
  TAddToBasketNotifiTrigger,
  TNotificationState,
} from "../types";

export const notifiState: TNotificationState = {
  addProduct: false
};

export const NotificationReducer: Reducer<TNotificationState, Actions> = (state = notifiState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ADD_TO_BASKET_NOTIFI:
      return {
        ...state,
        addProduct: action.payload
      };

    default:
      return state;
  }
};

export const addToBasketNotifiTrigger =
  (payload: boolean): TAddToBasketNotifiTrigger => ({type: ActionTypes.SHOW_ADD_TO_BASKET_NOTIFI, payload})