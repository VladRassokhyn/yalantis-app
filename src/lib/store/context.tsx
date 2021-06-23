import React, { ReactNode } from "react";
import { ProductsReducer, productState } from "./ProductReducer";
import { NotificationReducer, notifiState, NotifiDispatchContext, NotifiStateContext } from "./Notificator";
import { TDispatch, TProductState } from "../types";

export const AppStateContext = React.createContext<TProductState>(productState);
export const AppDispatchContext = React.createContext<TDispatch>(() => {
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = React.useReducer(ProductsReducer, productState);
  const [NotifiState, NotifiDispatch] = React.useReducer(NotificationReducer, notifiState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <NotifiStateContext.Provider value={NotifiState}>
          <NotifiDispatchContext.Provider value={NotifiDispatch}>
            {children}
          </NotifiDispatchContext.Provider>
        </NotifiStateContext.Provider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};