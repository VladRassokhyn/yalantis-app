import React from "react";
import { Header } from "./Header";
import { List } from "../common/List";
import { ProductItem } from "./ProductItem";
import { getProducts } from "../lib/api";
import { productState, ProductsReducer, setIsLoading, setProducts } from "../lib/store/ProductReducer";
import { Preloader } from "../common/Preloder";

export const Main = () => {

  const [state, dispatch] = React.useReducer(ProductsReducer, productState);

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