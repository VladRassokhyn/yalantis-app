import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import { selectBasketOptions, selectIds } from '../lib/store/basketSlice';
import { List } from '../components/List';
import { ProductBasketItem } from '../components/ProductBasketItem';
import { OrderButton } from '../components/Buttons/OrderButton';

export const BasketPage = () => {
  const { totalCount, totalPrice } = useSelector(selectBasketOptions);
  const basketItemsIds = useSelector(selectIds);

  return (
    <div className={'basket-wrapper'}>
      <div className={'basket-total'}>
        <h1>Total Products: {totalCount}</h1>
        <h1>Total Price: {totalPrice}$</h1>
      </div>
      <List listArray={basketItemsIds} ItemComponent={ProductBasketItem}/>
      {totalCount < 1 && <h5>Basket is empty :( </h5>}
      <div className={'basket-order-button'}>
        {totalCount > 1 && <OrderButton/>}
      </div>
    </div>
  );
};