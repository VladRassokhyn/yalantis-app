import React from "react";
import { ProductDispatchContext, ProductStateContext } from "./context";

export const useProductsState = () => {
  const context = React.useContext(ProductStateContext);
  if (context === undefined) {
    throw new Error("State error");
  }
  return context;
};

export const useProductsDispatch = () => {
  const context = React.useContext(ProductDispatchContext);
  if (context === undefined) {
    throw new Error("Dispatch error");
  }
  return context;
};