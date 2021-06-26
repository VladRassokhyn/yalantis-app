import React from 'react';
import { useProductsContext } from '../lib/store/Products';
//import { List } from '../components/List';
//import { ProductBasketItem } from '../components/ProductBasketItem';

export const BasketPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useProductsContext();
  let totalProducts = 0;
  let totalPrice = 0;

  state.basketItems.forEach((item) => {
    totalProducts += item.count;
    totalPrice += item.price * item.count;
  });


  return (
    <div className={'basket-wrapper'}>
      <div className={'basket-total'}>
        <h1>Total Products: {totalProducts}</h1>
        <h1>Total Price: {totalPrice}$</h1>
      </div>
      {//<List listArray={state.basketItems} ItemComponent={ProductBasketItem} />
        }
      {state.basketItems.length < 1 && <h5>Basket is empty :( </h5>}
    </div>
  );
};
