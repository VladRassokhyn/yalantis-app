import React from "react";
import { deleteNotification, useNotifiContext } from "../../lib/store/Notificator";
import { Notification } from "./Notification";

export const Notificator = () => {

  const [state, dispatch ]= useNotifiContext()

  return <div className={"notificator-wrapper"}>
    {state.map((notification: any) => {
        return <Notification
          deleteFn={() => dispatch(deleteNotification(notification.id))}
          key={notification.id}
          notification={notification}
        />;
      }
    ).reverse()}
  </div>;
};