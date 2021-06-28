import React from 'react';
import { useProductsState } from '../lib/store/Products';
import { List } from '../components/List';
import { ProductBasketItem } from '../components/ProductBasketItem';

export const BasketPage = () => {

  const state = useProductsState();
  let totalProducts = 0;
  let totalPrice = 0;

  React.useEffect(() => {
    state.basketItems.forEach((item) => {
      totalProducts += item.count;
      totalPrice += item.price * item.count;
    });
  }, [state.basketItems])


  return (
    <div className={'basket-wrapper'}>
      <div className={'basket-total'}>
        <h1>Total Products: {totalProducts}</h1>
        <h1>Total Price: {totalPrice}$</h1>
      </div>
      <List listArray={state.basketItems} ItemComponent={ProductBasketItem} />
      {state.basketItems.length < 1 && <h5>Basket is ampty :( </h5>}
    </div>
  );
};
