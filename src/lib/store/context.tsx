import React, { ReactNode } from "react";
import { ProductsReducer, productState } from "./ProductReducer";
import { TDispatch, TNotificationState, TProductState } from "../types";
import { NotificationReducer, notifiState } from "./NotificationReducer";

export const AppStateContext = React.createContext<TProductState>(productState);
export const AppDispatchContext = React.createContext<TDispatch>(() => {
});
export const NotifiStateContext = React.createContext<TNotificationState>(notifiState);
export const NotifiDispatchContext = React.createContext<TDispatch>(() => {
});


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = React.useReducer(ProductsReducer, productState);
  const [NotifiState, NotifiDspatch] = React.useReducer(NotificationReducer, notifiState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <NotifiStateContext.Provider value={NotifiState}>
          <NotifiDispatchContext.Provider value={NotifiDspatch}>
            {children}
          </NotifiDispatchContext.Provider>
        </NotifiStateContext.Provider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};