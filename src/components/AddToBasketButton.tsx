import React from "react";
import { IProduct } from "../lib/store/Products";
import { addProductToBasket,useProductsContext } from "../lib/store/Products";
import { useNotifiContext, addNotification } from "../lib/store/Notificator";

export const AddToBasketButton: React.FC<{ product: IProduct }> = ({ product }) => {

  // eslint-disable-next-line no-unused-vars
  const [_ , dispatchNotifi ] = useNotifiContext();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch ] = useProductsContext();

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