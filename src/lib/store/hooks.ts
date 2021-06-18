import React from "react";
import {
  AppDispatchContext,
  AppStateContext,
  NotifiDispatchContext,
  NotifiStateContext
} from "./context";

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("State error");
  }
  return context;
};

export const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("Dispatch error");
  }
  return context;
};

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