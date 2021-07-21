import React from 'react';
import { useSelector } from '../../lib/hooks/useSelector';
import { selectById } from '../../lib/store/productsSlice';
import { useDispatch } from 'react-redux';
import { addedToBasket } from '../../lib/store/basketSlice';
import { notificationAdded } from '../../lib/store/notoficationSlice';
import { NotificationTypes } from '../../lib/types';

export const AddToBasketButton: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => selectById(state, productId));

  if (!product) return null;

  const handleClick = React.useCallback(() => {
    dispatch(addedToBasket(product));
    dispatch(
      notificationAdded({
        type: NotificationTypes.SUCCESS,
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
