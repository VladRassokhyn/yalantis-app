import React from "react";
import { Header } from "./Header";
import { List } from "../common/List";
import { ProductItem } from "./ProductItem";
import { getProducts } from "../lib/api";
import { setIsLoading, setProducts } from "../lib/store/ProductReducer";
import { Preloader } from "../common/Preloder";
import { useAppDispatch, useAppState } from "../lib/store/hooks";

export const Main = () => {

  const state = useAppState();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    getProducts(state.page, state.perPage).then(res => {
      dispatch(setProducts(res.data.items));
      dispatch(setIsLoading(false));
    });
  }, []);

  return <div>
    <Header/>
    {state.isLoading
      ? <Preloader/>
      : <List listArray={state.items} ItemComponent={ProductItem}/>
    }
  </div>;
};