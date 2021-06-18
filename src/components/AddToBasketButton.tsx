import React from "react";
import { IProduct } from "../lib/types";
import { addProductToBasket} from "../lib/store/ProductReducer";
import { useAppDispatch, useNotifiDispatch } from "../lib/store/hooks";
import { addToBasketNotifiTrigger } from "../lib/store/NotificationReducer";

export const AddToBasketButton: React.FC<{product: IProduct}> = ({ product }) => {

  const dispatchNotifi = useNotifiDispatch();
  const dispatch = useAppDispatch();


  const handleClick = () => {
    dispatchNotifi(addToBasketNotifiTrigger(true))
    dispatch(addProductToBasket(product));
  };

  return <button
    className={'add-to-basket-button'}
    onClick={handleClick}
  >
    ADD
  </button>
};