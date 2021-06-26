import React from "react";
import { useNotifiContext, addNotification } from "../lib/store/Notificator";
import { useSelector } from "../lib/store/hooks";
import { selectById } from "../lib/store/productsSlice";
import { useDispatch } from "react-redux";
import { addedToBasket } from "../lib/store/basketSlice";

export const AddToBasketButton: React.FC<{ productId: string }> = ({ productId }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, dispatchNotifi] = useNotifiContext();

  const dispatch = useDispatch();

  const product = useSelector((state) => selectById(state, productId));

  const handleClick = React.useCallback(() => {
    dispatch(addedToBasket(product))
    dispatchNotifi(
      addNotification(
        "notification-success",
        `${product && product.name} added to basket !`
      )
    );
  }, [productId]);

  return (
    <button className={"add-to-basket-button"} onClick={handleClick}>
      ADD
    </button>
  );
};
