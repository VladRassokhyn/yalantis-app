import React from "react";
import { IProduct } from "../lib/types";
import { addProductToBasket} from "../lib/store/ProductReducer";
import { useAppDispatch } from "../lib/store/hooks";

export const AddToBasketButton: React.FC<{product: IProduct}> = ({ product }) => {

  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleClick = () => {
    dispatch(addProductToBasket(product));
    setShowSuccess(true);
  };

  React.useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }, [showSuccess])

  return <button
    className={'add-to-basket-button'}
    onClick={handleClick}
  >
    ADD
    {showSuccess && <div className={'added-to-basket'}>{product.name} - added to basket !</div>}
  </button>
};