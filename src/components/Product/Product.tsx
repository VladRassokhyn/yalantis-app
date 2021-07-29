import React from 'react';
import defaultProductPhoto from '../../static/defaultProductPhoto.svg';
import { AddToBasketButton } from '../Buttons';
import { IProduct } from '../../lib/types';
import { EditProductButton } from '../Buttons';
import { DeleteProductButton } from '../Buttons';

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
  const buttons = React.useMemo(() => {
    return !product.isEditable ? (
      <AddToBasketButton productId={product.id}>ADD</AddToBasketButton>
    ) : (
      <div className={'product-buttons'}>
        <EditProductButton product={product} />
        <DeleteProductButton productId={product.id}>DELETE</DeleteProductButton>
      </div>
    );
  }, [product.isEditable]);

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
              {buttons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
