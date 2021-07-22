import React, { Dispatch } from 'react';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import { useSelector } from '../lib/hooks/useSelector';
import { changedItemCount, deletedFromBasket } from '../lib/store/basketSlice';
import { notificationAdded } from '../lib/store/notoficationSlice';
import { useDispatch } from 'react-redux';
import trash from '../static/trash.svg';
import { Counter } from '../common/Counter';
import { EntityId } from '@reduxjs/toolkit';
import { NotificationTypes } from '../lib/types';
import { selectBasketItemsById } from '../lib/store/selectors';

const validate = (count: number, dispatch: Dispatch<{}>) => {
  if (count === 0) {
    dispatch(
      notificationAdded({
        type: NotificationTypes.ERROR,
        label: `Can\`t be lower then 1`,
      })
    );
    return false;
  } else if (count.toString().length > 3) {
    dispatch(
      notificationAdded({
        type: NotificationTypes.ERROR,
        label: `Maximum counts is 999`,
      })
    );
    return false;
  } else {
    return true;
  }
};

export const ProductBasketItem: React.FC<{ itemId: EntityId }> = ({
  itemId,
}) => {
  const product = useSelector((state) => selectBasketItemsById(state, itemId));
  if (!product) return null;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!validate(product.count, dispatch)) {
      dispatch(changedItemCount({ id: itemId, count: 1 }));
    }
  }, [product.count, dispatch]);

  const changerFn = React.useCallback(
    (count: number) => {
      dispatch(changedItemCount({ id: itemId, count }));
    },
    [itemId]
  );

  const handlerDelete = React.useCallback(() => {
    dispatch(deletedFromBasket({ id: itemId }));
  }, [itemId]);

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
          <Counter count={product.count} changerFn={changerFn} />
        </h2>
      </div>
      <div className={'basket-item-total-container'}>
        <h1>Total Price</h1>
        <h2>{product.price * product.count}$</h2>
      </div>
      <div className={'basket-delete-wrapper'} onClick={handlerDelete}>
        <img src={trash} alt={'trash'} />
        <h3>DELETE</h3>
      </div>
    </div>
  );
};
