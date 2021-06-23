import React from "react";
import {
  AppDispatchContext,
  AppStateContext,
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