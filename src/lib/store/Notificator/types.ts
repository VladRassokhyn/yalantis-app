export type TNotification = {
  type: string;
  isActive: boolean;
  id: string;
  label: string;
};

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  ADD_NOTIFICATION = 'products/ADD_NOTIFICATION',
  // eslint-disable-next-line no-unused-vars
  DELETE_NOTIFICATION = 'products/DELETE_NOTIFICATION',
}

// eslint-disable-next-line no-unused-vars
export type TDispatch = (action: TActions) => void;

export type TActions = TAddNotification | TDeleteNotification;

export type TAddNotification = {
  type: ActionTypes.ADD_NOTIFICATION;
  nType: string;
  label: string;
};
export type TDeleteNotification = {
  type: ActionTypes.DELETE_NOTIFICATION;
  id: string;
};
