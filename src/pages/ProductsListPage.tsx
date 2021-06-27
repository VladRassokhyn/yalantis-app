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
  currentPerPageChanged
} from "../lib/store/productsSlice";
import { useSelector } from "../lib/store/hooks";
import { ListMenu } from "../components/ListMenu";

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
      <ListMenu
        page={page}
        perPage={perPage}
        totalItems={totalItems}
        changePageFn={(page: number) => toolkitDispatch(currentPageChanged(page))}
        changePerPageFn={(option: number) => toolkitDispatch(currentPerPageChanged(option))}
      />

      {status === "loading" && <ListPrototype/>}
      {status === "success" && (
        <List listArray={productsIds} ItemComponent={ProductListItem}/>
      )}
    </div>
  );
};
