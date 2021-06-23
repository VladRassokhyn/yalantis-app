import React from "react";
import { IProduct } from "../lib/types";
import { addProductToBasket } from "../lib/store/ProductReducer";
import { useNotifiDispatch } from "../lib/store/Notificator";
import { useAppDispatch } from "../lib/store/hooks";
import { addNotification } from "../lib/store/Notificator";

export const AddToBasketButton: React.FC<{ product: IProduct }> = ({ product }) => {

  const dispatchNotifi = useNotifiDispatch();
  const dispatch = useAppDispatch();

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