import React from "react";
import { addToBasketNotifiTrigger } from "../lib/store/NotificationReducer";
import { useNotifiDispatch, useNotifiState } from "../lib/store/hooks";

export const Notification = () => {

  const dispatchNotifi = useNotifiDispatch();
  const stateNotifi = useNotifiState();

  let label = "";

  if (stateNotifi.addProduct) {
    label = "Added success";
  }

  React.useEffect(() => {
    if (stateNotifi.addProduct) {
      setTimeout(() => dispatchNotifi(addToBasketNotifiTrigger(false)), 3000);
    }
  }, [stateNotifi]);

  return <div className={"notification-wrapper"}>
    <h1>{label}</h1>
  </div>;
};