import { ActionTypes, TAddNotification, TDeleteNotification } from './types';

export const addNotification = (
  nType: string,
  label: string
): TAddNotification => ({ type: ActionTypes.ADD_NOTIFICATION, nType, label });

export const deleteNotification = (id: string): TDeleteNotification => ({
  type: ActionTypes.DELETE_NOTIFICATION,
  id,
});
