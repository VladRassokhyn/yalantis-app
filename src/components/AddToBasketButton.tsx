import React from "react";
import { IProduct } from "../lib/types";
import { addProductToBasket} from "../lib/store/ProductReducer";
import { useAppDispatch } from "../lib/store/hooks";

export const AddToBasketButton: React.FC<{product: IProduct}> = ({ product }) => {

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addProductToBasket(product))
  };

  return <button
    className={'add-to-basket-button'}
    onClick={handleClick}
  >ADD</button>
};