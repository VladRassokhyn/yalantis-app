import React from "react";
import { List } from "../common/List";
import { ProductListItem } from "./ProductListItem";
import { getProducts } from "../lib/api";
import { setIsLoading, setProducts } from "../lib/store/ProductReducer";
import { Preloader } from "../common/Preloder";
import { useAppDispatch, useAppState } from "../lib/store/hooks";
import { Paginator } from "../common/Paginator";

export const ProductsListPage = () => {

  const state = useAppState();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    getProducts(state.page, state.perPage).then(res => {
      dispatch(setProducts(res.data.items, res.data.totalItems));
      dispatch(setIsLoading(false));
    });
  }, [state.page]);

  return <div>
    <Paginator
      currentPage={state.page}
      perPage={state.perPage}
      totalItems={state.totalItems}
    />
    {state.isLoading
      ? <div className={'preloader-wrapper'}><Preloader/></div>
      : <List listArray={state.items} ItemComponent={ProductListItem}/>
    }
  </div>;
};