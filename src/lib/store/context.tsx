import React, { ReactNode } from "react";
import { ProductsReducer, productState } from "./ProductReducer";
import { TDispatch, TProductState } from "../types";

export const AppStateContext = React.createContext<TProductState>(productState);
export const AppDispatchContext = React.createContext<TDispatch>(()=>{});

export const AppProvider:React.FC<{children: ReactNode}> = ({children}) => {

  const [state, dispatch] = React.useReducer(ProductsReducer, productState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}