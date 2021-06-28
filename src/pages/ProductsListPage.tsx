import React from "react";
import { List } from "../components/List";
import { ProductListItem } from "../components/ProductListItem";
import { ListPrototype } from "../common/ListPrototype";
import { useDispatch } from "react-redux";
import {
  selectProductsOptions,
  getProducts,
  selectIds,
  currentPageChanged,
  currentPerPageChanged,
  originsChanged,
  priceFilterChanged
} from "../lib/store/productsSlice";
import { useSelector } from "../lib/store/hooks";
import { ListMenu } from "../components/ListMenu";
import { Paginator } from "../common/Paginator";

export const ProductsListPage = () => {
  const dispatch = useDispatch();

  const productsIds = useSelector(selectIds);

  const {
    page,
    perPage,
    totalItems,
    status,
    origins,
    filterOrigins,
    minPrice,
    maxPrice,
    filterPrice
  } = useSelector(selectProductsOptions);

  React.useEffect(() => {
    dispatch(getProducts({
      page,
      perPage,
      origins: filterOrigins ? filterOrigins : origins,
      minPrice: filterPrice.min,
      maxPrice: filterPrice.max
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, perPage, origins, filterOrigins, filterPrice]);

  return (
    <div>
      <ListMenu
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
          dispatch(priceFilterChanged({min, max}))
        }
      />

      {status === "loading" && <ListPrototype/>}
      {status === "success" && (
        <List listArray={productsIds} ItemComponent={ProductListItem}/>
      )}

      <Paginator
        changer={(page: number) =>
          dispatch(currentPageChanged(page))}
        currentPage={page}
        perPage={perPage}
        totalItems={totalItems}
      />
    </div>
  );
};
