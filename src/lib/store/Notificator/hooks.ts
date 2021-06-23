import React from "react";
import { NotifiDispatchContext, NotifiStateContext } from "./context";


export const useNotifiState = () => {
  const context = React.useContext(NotifiStateContext);
  if (context === undefined) {
    throw new Error("Notification state error");
  }
  return context;
};

export const useNotifiDispatch = () => {
  const context = React.useContext(NotifiDispatchContext);
  if (context === undefined) {
    throw new Error("Notification dispatch error");
  }
  return context;
};