import React from "react";
import { deleteNotification, useNotifiDispatch, useNotifiState } from "../../lib/store/Notificator";
import { Notification } from "./Notification";

export const Notificator = () => {

  const state = useNotifiState();
  const dispatch = useNotifiDispatch();

  return <div className={"notificator-wrapper"}>
    {state.map(notification => {
        return <Notification
          deleteFn={() => dispatch(deleteNotification(notification.id))}
          key={notification.id}
          notification={notification}
        />;
      }
    ).reverse()}
  </div>;
};