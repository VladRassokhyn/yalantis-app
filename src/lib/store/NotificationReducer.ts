import { Reducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Actions, ActionTypes, TAddNotification, TDeleteNotification, TNotification } from "../types";

export const notifiState: TNotification[] = []

export const NotificationReducer: Reducer<TNotification[], Actions> = (state = notifiState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return [
        ...state,
        {type: action.nType, isActive: true, id: uuidv4(), label: action.label}
      ]
    case ActionTypes.DELETE_NOTIFICATION:
      return [
        ...state.filter(notification => notification.id !== action.id)
      ]
    default:
      return state;
  }
};

export const addNotification =
  (nType: string, label: string): TAddNotification => ({type: ActionTypes.ADD_NOTIFICATION, nType, label})

export const deleteNotification =
  (id: string): TDeleteNotification => ({type: ActionTypes.DELETE_NOTIFICATION, id})
