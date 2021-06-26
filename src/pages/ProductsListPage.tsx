import React from 'react';
import { List } from '../components/List';
import { ProductListItem } from '../components/ProductListItem';
import { Paginator } from '../common/Paginator';
import { ListPrototype } from '../common/ListPrototype';
import { Selector } from '../common/Selector';
import { useDispatch } from 'react-redux';
import {
  selectProductsOptions,
  getProducts,
  selectIds,
  currentPageChanged,
  currentPerPageChanged,
} from '../lib/store/productsSlice';
import { useSelector } from '../lib/store/hooks';

export const ProductsListPage = () => {
  const toolkitDispatch = useDispatch();

  const productsIds = useSelector(selectIds);

  const { page, perPage, totalItems, status } = useSelector(
    selectProductsOptions
  );

  React.useEffect(() => {
    toolkitDispatch(getProducts({ page, perPage }));
  }, [page, perPage]);

  return (
    <div>
      {status === 'loading' && <ListPrototype />}
      {status === 'success' && (
        <List listArray={productsIds} ItemComponent={ProductListItem} />
      )}

      <Paginator
        changer={(page: number) => toolkitDispatch(currentPageChanged(page))}
        currentPage={page}
        perPage={perPage}
        totalItems={totalItems}
      />

      <Selector
        label={'Show in page'}
        changer={(option) => toolkitDispatch(currentPerPageChanged(option))}
        current={perPage}
        arr={[10, 25, 50]}
      />

    </div>
  );
};
