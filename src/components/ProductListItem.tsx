import React from 'react';
import { AddToBasketButton } from './Buttons/AddToBasketButton';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import { selectById } from '../lib/store/productsSlice';
import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from '../lib/hooks/useSelector';
import { EditProductButton } from './Buttons/EditProductButton';

export const ProductListItem: React.FC<{ itemId: EntityId }> = ({ itemId }) => {
  const product = useSelector((state) => selectById(state, itemId));
  const isProductPage = useLocation().pathname === ROUTE_PATHS.PRODUCTS.BASE();

  if (!product) return null;

  return (
    <div className={'product-item-wrapper'}>
      <Link to={ROUTE_PATHS.PRODUCTS.BY_ID({ productId: product.id })}>
        <img
          className={'product-item-photo'}
          src={defaultProductPhoto}
          alt={'image'}
        />
      </Link>
      <div className={'product-item-title'}>
        <Link to={ROUTE_PATHS.PRODUCTS.BY_ID({ productId: product.id })}>
          <h1>{product.name}</h1>
          <h3>Origin: {product.origin}</h3>
        </Link>
        <h2>
          {product.price}$
          {
            isProductPage
              ? <AddToBasketButton productId={product.id}/>
              : <EditProductButton productId={product.id}/>
          }
        </h2>
      </div>
    </div>
  );
};
