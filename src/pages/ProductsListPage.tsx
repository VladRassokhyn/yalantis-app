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
  allFiltersResets,
  getOrigins,
} from '../lib/store/productsSlice';
import { useSelector } from '../lib/hooks/useSelector';
import { ListMenu } from '../components/ListMenu';
import { Paginator } from '../common/Paginator';
import { useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../lib/router/paths';
import { selectProductsIds, selectProductsOptions } from '../lib/store/selectors';

export const ProductsListPage = () => {
  const isProductPage = useLocation().pathname === ROUTE_PATHS.PRODUCTS.BASE();

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
    filterPrice,
    newProductStatus,
    updateStatus,
  } = useSelector(selectProductsOptions);

  React.useEffect(() => {
    if (newProductStatus === '') {
      dispatch(
        getProducts({
          page,
          perPage,
          origins: filterOrigins
            ? filterOrigins.map((o) => o.value)
            : origins.map((o) => o.value),
          minPrice: filterPrice.min,
          maxPrice: filterPrice.max,
          editable: !isProductPage,
        })
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [
    page,
    perPage,
    origins,
    filterOrigins,
    filterPrice,
    newProductStatus,
    updateStatus,
    dispatch,
  ]);

  React.useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch(allFiltersResets());
    };
  }, [dispatch]);

  return (
    <div>
      <ListMenu
        statusOrigins={statusOrigins}
        perPage={perPage}
        origins={origins}
        minPrice={minPrice}
        maxPrice={maxPrice}
        filterPrice={filterPrice}
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

      {status === 'loading' && <ListPrototype />}
      {status === 'success' && (
        <List listArray={productsIds} ItemComponent={ProductListItem} />
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
