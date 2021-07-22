import React from 'react';
import { List } from '../components/List';
import { ProductListItem } from '../components/ProductListItem';
import { ListPrototype } from '../common/ListPrototype';
import { useDispatch } from 'react-redux';
import {
  getProducts,
  currentPageChanged,
  currentPerPageChanged,
  originsChanged,
  priceFilterChanged,
  getOrigins,
  filtersSetsFromUrl
} from '../lib/store/productsSlice';
import { useSelector } from '../lib/hooks/useSelector';
import { ListMenu } from '../components/ListMenu';
import { Paginator } from '../common/Paginator';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import {
  selectProductsIds,
  selectProductsOptions
} from '../lib/store/selectors';
import { RequestStatuses } from '../lib/types';
import { getQueryParameters, updateQueryParams } from '../lib/api/queryParams';

export const ProductsListPage = () => {
  const isProductPage = useRouteMatch(ROUTE_PATHS.PRODUCTS.BASE());

  const location = useLocation();

  const dispatch = useDispatch();

  const productsIds = useSelector(selectProductsIds);

  const {
    page,
    perPage,
    totalItems,
    status,
    statusOrigins,
    origins,
    filterOrigins,
    minPrice,
    maxPrice,
    newProductStatus,
    updateStatus
  } = useSelector(selectProductsOptions);

  React.useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  React.useEffect(() => {
    if (newProductStatus === RequestStatuses.IDLE) {
      const queryParams = getQueryParameters(location.search);
      dispatch(filtersSetsFromUrl({...queryParams, editable: !isProductPage}));
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getProducts({
      page,
      perPage,
      maxPrice,
      minPrice,
      filterOrigins,
      editable: !isProductPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, newProductStatus, updateStatus, page, perPage, maxPrice, minPrice, filterOrigins]);

  updateQueryParams({ page, perPage, minPrice, maxPrice, filterOrigins });

  return (
    <div>
      <ListMenu
        statusOrigins={statusOrigins}
        perPage={perPage}
        origins={origins}
        minPrice={minPrice}
        maxPrice={maxPrice}
        changePerPageFn={(perPage: number) =>
          dispatch(currentPerPageChanged(perPage))
        }
        changeOriginsFn={(origins: string[]) =>
          dispatch(originsChanged(origins))
        }
        changePriceFn={(min: number, max: number) =>
          dispatch(priceFilterChanged({ min, max }))
        }
      />

      {status === RequestStatuses.LOADING && <ListPrototype/>}
      {status === RequestStatuses.SUCCESS && (
        <List listArray={productsIds} ItemComponent={ProductListItem}/>
      )}

      <Paginator
        changer={(page: number) => dispatch(currentPageChanged(page))}
        currentPage={page}
        perPage={perPage}
        totalItems={totalItems}
      />
    </div>
  );
};

