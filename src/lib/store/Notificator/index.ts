import { NotificationReducer, notifiState } from "./reducer";
import { addNotification, deleteNotification } from "./actions";
import { NotifiStateContext, NotifiDispatchContext } from "./context";
import { TNotification } from "./types";
import { useNotifiDispatch, useNotifiState } from "./hooks";

export {
  notifiState,
  NotificationReducer,
  addNotification,
  deleteNotification,
  NotifiStateContext,
  NotifiDispatchContext,
  useNotifiDispatch,
  useNotifiState
};

export type { TNotification };
