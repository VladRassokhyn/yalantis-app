import React from 'react';
import { useSelector } from '../../lib/hooks/useSelector';
import {
  deleteProduct,
  statusResets,
} from '../../lib/store/productsSlice';
import { useDispatch } from 'react-redux';
import { notificationAdded } from '../../lib/store/notoficationSlice';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATHS } from '../../lib/router/paths';
import { NotificationTypes } from '../../lib/types';
import { selectProductsOptions } from '../../lib/store/selectors';

export const DeleteProductButton: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const history = useHistory();

  const { deleteStatus } = useSelector(selectProductsOptions);
  const dispatch = useDispatch();

  const handleClick = React.useCallback(() => {
    dispatch(deleteProduct(productId));
  }, [productId]);

  React.useEffect(() => {
    if (deleteStatus === 'success') {
      dispatch(
        notificationAdded({
          type: NotificationTypes.SUCCESS,
          label: 'Product deleted !',
        })
      );
      dispatch(statusResets('deleteStatus'));
      history.push(ROUTE_PATHS.MY_PRODUCTS.BASE());
    }
  }, [deleteStatus, dispatch]);

  return (
    <>
      <button onClick={handleClick} className={'add-to-basket-button'}>
        DELETE
      </button>
    </>
  );
};
