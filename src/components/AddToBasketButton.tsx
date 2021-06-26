import React from "react";
import { useSelector } from "../lib/store/hooks";
import { selectById } from "../lib/store/productsSlice";
import { useDispatch } from "react-redux";
import { addedToBasket } from "../lib/store/basketSlice";
import { notificationAdded } from "../lib/store/notoficationSlice";

export const AddToBasketButton: React.FC<{ productId: string }> = ({ productId }) => {

  const dispatch = useDispatch();

  const product = useSelector((state) => selectById(state, productId));

  const handleClick = React.useCallback(() => {
    if (product) {
      dispatch(addedToBasket(product))
    }
    dispatch(
      notificationAdded({
        type: "notification-success",
        label:`${product && product.name} added to basket !`
  })
    );
  }, [productId]);

  return (
    <button className={"add-to-basket-button"} onClick={handleClick}>
      ADD
    </button>
  );
};
