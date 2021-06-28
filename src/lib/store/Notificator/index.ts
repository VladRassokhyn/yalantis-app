import { NotificationReducer, notifiState } from './reducer';
import { addNotification, deleteNotification } from './actions';
import { NotifiStateContext, NotifiDispatchContext } from './context';
import { TNotification } from './types';
import { useNotifiContext,useNotifiDispatch,useNotifiState } from './hooks';

export {
  useNotifiDispatch,
  useNotifiState,
  notifiState,
  NotificationReducer,
  addNotification,
  deleteNotification,
  NotifiStateContext,
  NotifiDispatchContext,
  useNotifiContext,
};

export type { TNotification };
