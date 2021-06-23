import React from "react";
import { TDispatch, TNotification } from "./types";
import { notifiState } from "./reducer";

export const NotifiStateContext = React.createContext<TNotification[]>(notifiState);
export const NotifiDispatchContext = React.createContext<TDispatch>(() => {
});