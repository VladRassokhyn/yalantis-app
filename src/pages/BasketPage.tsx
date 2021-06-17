import React from "react";
import { useAppState } from "../lib/store/hooks";
import { List } from "../components/List";
import { ProductBasketItem } from "../components/ProductBasketItem";

export const BasketPage = () => {

  const state = useAppState();
  let totalProducts = 0;
  let totalPrice = 0;

  state.basketItems.forEach(item => {
    totalProducts += item.count;
    totalPrice += item.price * item.count;
  });

  return <div className={"basket-wrapper"}>
    <div className={"basket-total"}>
      <h1>Total Products: {totalProducts}</h1>
      <h1>Total Price: {totalPrice}$</h1>
    </div>
    <List listArray={state.basketItems} ItemComponent={ProductBasketItem}/>
  </div>;
};