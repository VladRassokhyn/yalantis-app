import React from "react";
import { List } from "../components/List";
import { ProductListItem } from "../components/ProductListItem";
import { getProducts } from "../lib/api";
import { setCurrentPage, setIsLoading, setProducts } from "../lib/store/Products";
import { useProductsDispatch, useProductsState } from "../lib/store/Products";
import { Paginator } from "../common/Paginator";
import { ListPrototype } from "../common/ListPrototype";

export const ProductsListPage = () => {

  const state = useProductsState();
  const dispatch = useProductsDispatch();

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    getProducts(state.page, state.perPage).then(res => {
      dispatch(setProducts(res.data.items, res.data.totalItems));
      dispatch(setIsLoading(false));
    });
  }, [state.page, state.perPage]);

  return <div>

    {state.isLoading
      ? <ListPrototype listLength={state.perPage}/>
      : <List listArray={state.items} ItemComponent={ProductListItem}/>
    }<Paginator
    changer={(page: number) => dispatch(setCurrentPage(page))}
    currentPage={state.page}
    perPage={state.perPage}
    totalItems={state.totalItems}
  />
  </div>;
};