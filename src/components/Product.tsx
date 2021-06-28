import React from 'react';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { AddToBasketButton } from './AddToBasketButton';
import { IProduct } from '../lib/store/Products';

type TProps = {
  product: IProduct;
  createdAt: string;
  updatedAt: string;
};

export const Product: React.FC<TProps> = ({
  product,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className={'product-wrapper'}>
      <div className={'product-container'}>
        <h1>{product.name}</h1>
        <div className={'product-description-container'}>
          <div className={'product-image-wrapper'}>
            <img
              src={`${product.photo ? product.photo : defaultProductPhoto}`}
              alt={'image'}
            />
          </div>
          <div className={'product-description'}>
            <h2>
              <b>Origin:</b> {product.origin}
            </h2>
            <h2>
              <b>Created:</b> {createdAt}
            </h2>
            <h2>
              <b>Updated:</b> {updatedAt}
            </h2>
            <div className={'product-price-container'}>
              <h1>{product.price}$</h1>
              <AddToBasketButton product={product}>ADD</AddToBasketButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
