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
  clearFilters
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
    minPrice,
    maxPrice,
    newProductStatus,
    updateStatus,
    filterOrigins
  } = useSelector(selectProductsOptions);
/*

  React.useEffect(() => {
    dispatch(getOrigins());
    const queryParams = getQueryParameters(location.search);
    dispatch(filtersSetsFromUrl({ ...queryParams, editable: !isProductPage }));
  }, [dispatch]);

  updateQueryParams({ page, perPage, minPrice, maxPrice, filterOrigins });
*/

  React.useEffect(() => {
    if (newProductStatus === RequestStatuses.IDLE) {
        dispatch(getProducts({
          editable: !isProductPage
        }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return () => {
      dispatch(clearFilters())
    }
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
        changePerPageFn={(value: {perPage: number}) =>
          dispatch(currentPerPageChanged(value))
        }
        changeOriginsFn={(origins: string[]) =>
          dispatch(originsChanged({origins}))
        }
        changePriceFn={(minPrice: number, maxPrice: number) =>
          dispatch(priceFilterChanged({ minPrice, maxPrice }))
        }
      />

      {status === RequestStatuses.LOADING && <ListPrototype/>}
      {status === RequestStatuses.SUCCESS && (
        <List listArray={productsIds} ItemComponent={ProductListItem}/>
      )}

      <Paginator
        changer={(page: number) => dispatch(currentPageChanged({page}))}
        currentPage={page}
        perPage={perPage}
        totalItems={totalItems}
      />
    </div>
  );
};

