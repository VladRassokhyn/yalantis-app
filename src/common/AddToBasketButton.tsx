import React, { useReducer } from "react";
import { TProduct } from "../lib/types";
import { addProduct, BasketReducer, BasketState } from "../lib/store/BasketReducer";

export const AddToBasketButton: React.FC<{product: TProduct}> = ({ product }) => {

  const [state, dispatch] = useReducer(BasketReducer, BasketState)

  const handleClick = () => {
    dispatch(addProduct(product))
    console.log(state.items)
  };

  return <div>
    <button onClick={handleClick}>
      {product.price}
    </button>
  </div>;
};