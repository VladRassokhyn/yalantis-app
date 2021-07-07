import React from 'react';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { AddToBasketButton } from './Buttons/AddToBasketButton';
import { IProduct } from '../lib/types';
import { EditProductButton } from './Buttons/EditProductButton';
import { DeleteProductButton } from './Buttons/DeleteProductButton';

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
            <img src={defaultProductPhoto} alt={'image'} />
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
              {
                !product.isEditable
                  ? <AddToBasketButton productId={product.id}>ADD</AddToBasketButton>
                  : <div className={'product-buttons'}>
                    <EditProductButton productId={product.id}/>
                    <DeleteProductButton productId={product.id}>DELETE</DeleteProductButton>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
