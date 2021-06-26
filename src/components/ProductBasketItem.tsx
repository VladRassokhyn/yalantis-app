import React from 'react';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import { useSelector } from "../lib/store/hooks";
import { selectById } from '../lib/store/basketSlice';

export const ProductBasketItem: React.FC<{ itemId: string }> = ({ itemId }) => {

  const product = useSelector(state => selectById(state, itemId))

  if (product) {
    return (
      <div className={'basket-item-wrapper'}>
        <img src={defaultProductPhoto} alt={'image'} />
        <div className={'basket-item-title-container'}>
          <Link to={ROUTE_PATHS.PRODUCTS.BY_ID({ productId: product.id })}>
            <h1>{product.name}</h1>
          </Link>
          <h2>
            <b>Price:</b> {product.price}$
          </h2>
          <h2>
            <b>Count:</b> {product.count}
          </h2>
        </div>
        <div className={'basket-item-total-container'}>
          <h1>Total Price</h1>
          <h2>{product.price * product.count}$</h2>
        </div>
      </div>
    );
  }else return null
};
