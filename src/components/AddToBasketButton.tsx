import React from 'react';
import { IProduct } from '../lib/store/Products';
import { addProductToBasket, useProductsDispatch } from '../lib/store/Products';
import { useNotifiDispatch, addNotification } from '../lib/store/Notificator';

export const AddToBasketButton: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  const dispatchNotifi = useNotifiDispatch();
  const dispatchProduct = useProductsDispatch();

  const handleClick = React.useCallback(() => {
    dispatchProduct(addProductToBasket(product));
    dispatchNotifi(
      addNotification(
        'notification-success',
        `${product.name} added to basket !`
      )
    );
  }, [product]);

  return (
    <button className={'add-to-basket-button'} onClick={handleClick}>
      ADD
    </button>
  );
};
