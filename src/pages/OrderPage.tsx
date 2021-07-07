import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../lib/hooks/useSelector';
import { getOrder, selectOrdersOptions } from '../lib/store/ordersSlice';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { OrderPiece } from '../components/OrderPiece';
import { ProductPrototype } from '../common/ProductPrototype';

export const OrderPage = () => {

  const params = useParams<{ orderId: string }>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (params.orderId) {
      dispatch(getOrder(params.orderId));
    }
  }, [params]);

  const { singleOrder, singleOrderStatus } = useSelector(selectOrdersOptions);
  if (!singleOrder) return null;

  let totalCount = 0;
  let totalPrice = 0;

  const createdAt = format(new Date(singleOrder.createdAt), 'HH:mm - dd.mm.yyyy');

  singleOrder.pieces.forEach(piece => {
    totalPrice += piece.count * piece.product.price;
    totalCount += piece.count;
  });

  if (singleOrderStatus === 'loading') {
    return <ProductPrototype/>;
  }

  return (
    <div className={'basket-wrapper'}>
      <div className={'basket-total'}>
        <h1>Created: {createdAt}</h1>
        <h1>Total Products: {totalCount}</h1>
        <h1>Total Price: {totalPrice}$</h1>
      </div>
      {singleOrder.pieces.map(piece => {
        return <OrderPiece
          key={piece.product.id}
          product={piece.product}
          count={piece.count}
        />;
      })}
    </div>
  );
};