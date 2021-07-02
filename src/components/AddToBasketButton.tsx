import React from 'react';
<<<<<<< HEAD
import { IProduct } from '../lib/store/Products';
import { addProductToBasket, useProductsDispatch } from '../lib/store/Products';
import { useNotifiDispatch, addNotification } from '../lib/store/Notificator';
=======
import { useSelector } from '../lib/hooks';
import { selectById } from '../lib/store/productsSlice';
import { useDispatch } from 'react-redux';
import { addedToBasket } from '../lib/store/basketSlice';
import { notificationAdded } from '../lib/store/notoficationSlice';
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984

export const AddToBasketButton: React.FC<{ productId: string }> = ({
  productId,
}) => {
<<<<<<< HEAD
  const dispatchNotifi = useNotifiDispatch();
  const dispatchProduct = useProductsDispatch();
=======
  const dispatch = useDispatch();

  const product = useSelector((state) => selectById(state, productId));

  if (!product) return null;
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984

  const handleClick = React.useCallback(() => {
    dispatch(addedToBasket(product));
    dispatch(
      notificationAdded({
        type: 'notification-success',
        label: `${product.name} added to basket !`,
      })
    );
  }, [productId]);

  return (
    <button className={'add-to-basket-button'} onClick={handleClick}>
      ADD
    </button>
  );
};
