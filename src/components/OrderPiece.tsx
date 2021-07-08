import React from 'react';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { IProduct } from '../lib/types';

type TProps = {
  product: IProduct;
  count: number;
};

export const OrderPiece: React.FC<TProps> = ({ product, count }) => {
  return (
    <div className={'basket-item-wrapper'}>
      <img src={defaultProductPhoto} alt={'image'} />
      <div className={'basket-item-title-container'}>
        <h1>{product.name}</h1>
        <h2>
          <b>Price:</b> {product.price}$
        </h2>
        <h2>
          <span> {count}</span>
        </h2>
      </div>
      <div className={'basket-item-total-container'}>
        <h1>Total Price</h1>
        <h2>{product.price * count}$</h2>
      </div>
    </div>
  );
};
