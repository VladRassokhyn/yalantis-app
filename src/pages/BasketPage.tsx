import React from "react";
import { useAppState } from "../lib/store/hooks";

export const BasketPage = () => {

  const state = useAppState();

  return <div>
    {state.basketItems.map((product, i) => {
      return <h1 key={i}>{`${product.name} - ${product.count}`}</h1>
    })}
  </div>
}