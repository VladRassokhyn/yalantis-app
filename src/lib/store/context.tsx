import React, { ReactNode } from "react";
import { ProductsReducer, productState, ProductStateContext, ProductDispatchContext } from "./Products";
import { NotificationReducer, notifiState, NotifiDispatchContext, NotifiStateContext } from "./Notificator";


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = React.useReducer(ProductsReducer, productState);
  const [NotifiState, NotifiDispatch] = React.useReducer(NotificationReducer, notifiState);

  return (
    <ProductStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        <NotifiStateContext.Provider value={NotifiState}>
          <NotifiDispatchContext.Provider value={NotifiDispatch}>
            {children}
          </NotifiDispatchContext.Provider>
        </NotifiStateContext.Provider>
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
};