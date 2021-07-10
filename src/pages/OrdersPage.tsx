import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import {
  getOrders,
  selectIds,
  selectOrdersOptions,
} from '../lib/store/ordersSlice';
import { useDispatch } from 'react-redux';
import { Order } from "../components/Order";
import { ProductPrototype } from '../common/ProductPrototype';

export const OrdersPage = () => {
  const ordersIds = useSelector(selectIds);
  const dispatch = useDispatch();
  const { getOrdersStatus } = useSelector(selectOrdersOptions);

  React.useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (getOrdersStatus === 'loading') {
    return <ProductPrototype />;
  }

  return (
    <div className={'order-wrapper'}>
      {ordersIds.map((id) => (
        <Order key={id} orderId={id} />
      ))}
      {ordersIds.length < 1 && 'No orders yet'}
    </div>
  );
};
