import React from "react";
import { useNotifiState } from "../../lib/store/hooks";
import { Notification } from "./Notification";

export const Notificator = () => {

  const state = useNotifiState();

  return <div className={"notificator-wrapper"}>
    {state.map(notification => {
        return <Notification key={notification.id} notification={notification}/>;
      }
    ).reverse()}
  </div>;
};