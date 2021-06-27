import React from 'react';
import { List } from '../components/List';
import { ProductListItem } from '../components/ProductListItem';
import { ListPrototype } from '../common/ListPrototype';
import { useDispatch } from 'react-redux';
import {
  selectProductsOptions,
  getProducts,
  selectIds,
  currentPageChanged,
  currentPerPageChanged,
} from '../lib/store/productsSlice';
import { useSelector } from '../lib/store/hooks';
import { ListMenu } from '../components/ListMenu';

export const ProductsListPage = () => {
  const dispatch = useDispatch();

  const productsIds = useSelector(selectIds);

  const { page, perPage, totalItems, status } = useSelector(
    selectProductsOptions
  );

  React.useEffect(() => {
    dispatch(getProducts({ page, perPage }));
  }, [page, perPage]);

  return (
    <div>
      <ListMenu
        page={page}
        perPage={perPage}
        totalItems={totalItems}
        changePageFn={(page: number) =>
          dispatch(currentPageChanged(page))}
        changePerPageFn={(perPage: number) =>
          dispatch(currentPerPageChanged(perPage))
        }
      />

      {status === 'loading' && <ListPrototype />}
      {status === 'success' && (
        <List listArray={productsIds} ItemComponent={ProductListItem} />
      )}
    </div>
  );
};
