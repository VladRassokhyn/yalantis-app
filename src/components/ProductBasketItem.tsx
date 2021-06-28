import React from 'react';
import defaultProductPhoto from '../static/defaultProductPhoto.svg';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import { useSelector } from '../lib/store/hooks';
import {
  changedItemCount,
  deletedFromBasket,
  selectById,
} from '../lib/store/basketSlice';
import { notificationAdded } from '../lib/store/notoficationSlice';
import { useDispatch } from 'react-redux';
import trash from '../static/trash.svg';

export const ProductBasketItem: React.FC<{ itemId: string }> = ({ itemId }) => {
  const product = useSelector((state) => selectById(state, itemId));
  if (!product) return null;

  const dispatch = useDispatch();

  const validate = () => {
    if (product.count === 0) {
      dispatch(
        notificationAdded({
          type: 'notification-error',
          label: `Can\`t be lower then 1`,
        })
      );
      return false;
    } else if (product.count.toString().length > 3) {
      dispatch(
        notificationAdded({
          type: 'notification-error',
          label: `Maximum counts is 999`,
        })
      );
      return false;
    } else return true;
  };

  React.useEffect(() => {
    if (!validate()) {
      dispatch(changedItemCount({ id: itemId, count: 1 }));
    }
  }, [product.count]);

  const increment = () => {
    dispatch(changedItemCount({ id: itemId, count: product.count + 1 }));
  };

  const decrement = () => {
    dispatch(changedItemCount({ id: itemId, count: product.count - 1 }));
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changedItemCount({ id: itemId, count: +e.target.value }));
  };

  const handlerSubmit = () => {
    dispatch(changedItemCount({ id: itemId, count: product.count }));
    dispatch(
      notificationAdded({
        type: 'notification-success',
        label: `Set\`s count to ${product.count}`,
      })
    );
  };

  const handlerDelete = () => {
    dispatch(deletedFromBasket({ id: itemId }));
  };

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
          <b>Count:</b>
          <input
            className={'basket-count-input'}
            value={product.count}
            onChange={(e) => handlerChange(e)}
            onBlur={handlerSubmit}
          />
          <div className={'basket-count-buttons'}>
            <span className={'basket-count-increment'} onClick={increment} />
            <span className={'basket-count-decrement'} onClick={decrement} />
          </div>
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
