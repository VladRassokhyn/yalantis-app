import React from "react";
import { TProduct } from "../lib/types";
import { addProductToBasket} from "../lib/store/ProductReducer";
import { useAppDispatch, useAppState } from "../lib/store/hooks";

export const AddToBasketButton: React.FC<{product: TProduct}> = ({ product }) => {

  const state = useAppState();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addProductToBasket(product))
    console.log(state.basketItems)
  };

  return <button
    className={'add-to-basket-button'}
    onClick={handleClick}
  >ADD</button>
};