import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import { selectBasketOptions } from '../lib/store/selectors';
import { List } from '../components/List/List';
import { ProductBasketItem } from '../components/List/ProductBasketItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import { selectBasketItemsIds } from '../lib/store/selectors';

export const BasketPage = () => {
  const { totalCount, totalPrice } = useSelector(selectBasketOptions);
  const basketItemsIds = useSelector(selectBasketItemsIds);

  return (
    <div className={'basket-wrapper'}>
      <div className={'basket-total'}>
        <h1>Total Products: {totalCount}</h1>
        <h1>Total Price: {totalPrice}$</h1>
      </div>
      <List listArray={basketItemsIds} ItemComponent={ProductBasketItem} />
      {totalCount < 1 && <h5>Basket is empty :( </h5>}
      <div className={'basket-order-button'}>
        {totalCount > 0 && <OrderButton />}
      </div>
    </div>
  );
};
