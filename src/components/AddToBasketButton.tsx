import React from "react";
import { IProduct } from "../lib/store/Products";
import { addProductToBasket } from "../lib/store/Products";
import { useNotifiDispatch } from "../lib/store/Notificator";
import { useProductsDispatch } from "../lib/store/Products";
import { addNotification } from "../lib/store/Notificator";

export const AddToBasketButton: React.FC<{ product: IProduct }> = ({ product }) => {

  const dispatchNotifi = useNotifiDispatch();
  const dispatch = useProductsDispatch();

  const handleClick = () => {
    dispatch(addProductToBasket(product));
    dispatchNotifi(addNotification("notification-success", `${product.name} added to basket !`));
  };

  return <button
    className={"add-to-basket-button"}
    onClick={handleClick}
  >
    ADD
  </button>;
};