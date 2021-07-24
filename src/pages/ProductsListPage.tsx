import React from 'react';
import { List } from '../components/List';
import { ProductListItem } from '../components/List';
import { ListPrototype } from '../common';
import { useDispatch } from 'react-redux';
import {
  getProducts,
  currentPageChanged,
  currentPerPageChanged,
  originsChanged,
  priceFilterChanged,
  clearFilters,
} from '../lib/store/productsSlice';
import { useSelector } from '../lib/hooks/useSelector';
import { ListMenu } from '../components/ListMenu';
import { Paginator } from '../common';
import {
  selectProductsIds,
  selectProductsOptions,
} from '../lib/store/selectors';
import { RequestStatuses } from '../lib/types';

export const ProductsListPage = () => {
  const dispatch = useDispatch();

  const productsIds = useSelector(selectProductsIds);

  const {
    page,
    perPage,
    totalItems,
    status,
    statusOrigins,
    origins,
    minPrice,
    maxPrice,
    newProductStatus,
    updateStatus,
    filterOrigins,
  } = useSelector(selectProductsOptions);

  React.useEffect(() => {
    if (newProductStatus === RequestStatuses.IDLE) {
      dispatch(getProducts({}));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return () => {
      dispatch(clearFilters());
    };
  }, [dispatch, newProductStatus, updateStatus]);

  return (
    <div>
      <ListMenu
        filterOrigins={filterOrigins}
        statusOrigins={statusOrigins}
        perPage={perPage}
        origins={origins}
        minPrice={minPrice}
        maxPrice={maxPrice}
        changePerPageFn={(value: { perPage: number }) =>
          dispatch(currentPerPageChanged(value))
        }
        changeOriginsFn={(origins: string[]) =>
          dispatch(originsChanged({ origins }))
        }
        changePriceFn={(minPrice: number, maxPrice: number) =>
          dispatch(priceFilterChanged({ minPrice, maxPrice }))
        }
      />

      {status === RequestStatuses.LOADING && <ListPrototype />}
      {status === RequestStatuses.SUCCESS && (
        <List listArray={productsIds} ItemComponent={ProductListItem} />
      )}

      <Paginator
        changer={(page: number) => dispatch(currentPageChanged({ page }))}
        currentPage={page}
        perPage={perPage}
        totalItems={totalItems}
      />
    </div>
  );
};
