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
  originsChanged
} from "../lib/store/productsSlice";
import { useSelector } from "../lib/store/hooks";
import { ListMenu } from "../components/ListMenu";
import { Paginator } from "../common/Paginator";

export const ProductsListPage = () => {
  const dispatch = useDispatch();

  const productsIds = useSelector(selectIds);

  const { page, perPage, totalItems, status, origins, filterOrigins } = useSelector(
    selectProductsOptions
  );

  React.useEffect(() => {
    dispatch(getProducts({
      page,
      perPage,
      origins: filterOrigins ? filterOrigins : origins
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, perPage, origins, filterOrigins]);

  return (
    <div>
      <ListMenu
        perPage={perPage}
        origins={origins}
        changePerPageFn={(perPage: number) =>
          dispatch(currentPerPageChanged(perPage))
        }
        changeOriginsFn={(origins: string[]) =>
          dispatch(originsChanged(origins))
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
