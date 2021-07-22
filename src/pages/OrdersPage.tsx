import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import { getOrders } from '../lib/store/ordersSlice';
import { useDispatch } from 'react-redux';
import { Order } from '../components/Order';
import { ProductPrototype } from '../common/ProductPrototype';
import { selectOrderIds, selectOrdersOptions } from '../lib/store/selectors';
import { RequestStatuses } from '../lib/types';

export const OrdersPage = () => {
  const ordersIds = useSelector(selectOrderIds);
  const dispatch = useDispatch();
  const { getOrdersStatus } = useSelector(selectOrdersOptions);

  React.useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (getOrdersStatus === RequestStatuses.LOADING) {
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
