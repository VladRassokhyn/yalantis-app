import { ProductsReducer } from "./ProductReducer";
import React from "react";

export const store = { ProductsReducer };
export const AppContext = React.createContext(store);