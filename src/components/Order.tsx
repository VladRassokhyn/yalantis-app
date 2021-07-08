import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import { selectById } from '../lib/store/ordersSlice';
import { format } from 'date-fns';
import { EntityId } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import { useOrderTotals } from '../lib/hooks/useOrdersTotal';

export const Order: React.FC<{ orderId: EntityId }> = ({ orderId }) => {
  const order = useSelector((state) => selectById(state, orderId));
  if (!order) return null;
  const [orderTotalCount, orderTotalPrice] = useOrderTotals(order.pieces);

  const createdAt = format(new Date(order.createdAt), 'dd.mm.yyyy - HH:mm ');

  return (
    <div>
      <Link to={ROUTE_PATHS.ORDERS.BY_ID({ orderId: orderId.toString() })}>
        <div className={'order-item_wrapper'}>
          <h1>Created: {createdAt}</h1>
          <h1>Total products count: {orderTotalCount}</h1>
          <h1>Total price: {orderTotalPrice}$</h1>
        </div>
      </Link>
    </div>
  );
};
