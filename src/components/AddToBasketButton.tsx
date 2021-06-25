import React from 'react';
import { IProduct } from '../lib/store/Products';
import { addProductToBasket, useProductsContext } from '../lib/store/Products';
import { useNotifiContext, addNotification } from '../lib/store/Notificator';

export const AddToBasketButton: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [_, dispatchNotifi] = useNotifiContext();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatchProduct] = useProductsContext();

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
