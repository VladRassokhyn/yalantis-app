import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import { basketCleared, selectAll } from '../lib/store/basketSlice';
import { useDispatch } from 'react-redux';
import { postNewOrder, postStatusResets, selectOrdersOptions } from '../lib/store/ordersSlice';
import { Preloader } from '../common/Preloader';
import { notificationAdded } from '../lib/store/notoficationSlice';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';

export const OrderButton: React.FC = () => {

  const toOrder = useSelector(selectAll);
  const { postStatus } = useSelector(selectOrdersOptions);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = React.useCallback(() => {
    const order = { order: { pieces: toOrder } };
    dispatch(postNewOrder(order));
  }, []);

  React.useEffect(() => {
    if (postStatus === 'success') {
      dispatch(notificationAdded({
        type: 'success',
        label: 'Order created!'
      }));
      dispatch(basketCleared());
      dispatch(postStatusResets());
      history.push(ROUTE_PATHS.ORDERS.BASE());
    }
  }, [postStatus]);

  return (
    <>
      {postStatus !== 'loading' && <button className={'add-to-basket-button'} onClick={handleClick}>
        ORDER
      </button>
      }
      {postStatus === 'loading' && <Preloader/>
      }
    </>
  );
};