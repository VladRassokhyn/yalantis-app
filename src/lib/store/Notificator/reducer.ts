import { Reducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TNotification, ActionTypes, TActions } from './types';

export const notifiState: TNotification[] = [];

export const NotificationReducer: Reducer<TNotification[], TActions> = (
  state = notifiState,
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return [
        ...state,
        {
          type: action.nType,
          isActive: true,
          id: uuidv4(),
          label: action.label,
        },
      ];
    case ActionTypes.DELETE_NOTIFICATION:
      return [...state.filter((notification) => notification.id !== action.id)];
    default:
      return state;
  }
};
