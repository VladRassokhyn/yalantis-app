import React from "react";
import { ProductsListPage } from "../pages/ProductsListPage";
import { ProductPage } from "../pages/ProductPage";
import { BasketPage } from "../pages/BasketPage";
import { Route } from "react-router-dom";

type TRoute = {
  path: string
  component: any
  routes?: TRoute[]
  exact?: boolean
}

const PARAM_PREFIX = ":";

export const pathMaker = (path: string) => {
  return (params?: {[key: string]: string}) => {
    if (params) {
      return Object.entries(params).reduce(
        (resultPath, [key, value]) =>
          resultPath.replace(
            `${PARAM_PREFIX}${key}`,
            value
          ),
        path
      );
    } else {
      return path
    }
  };
};

export const ROUTE_PATHS = {
  PRODUCTS: {
    BASE: pathMaker("/products"),
    BY_ID: pathMaker("/products/:productId")
  },
  BASKET: {
    BASE: pathMaker("/basket")
  }
};

export const routes: TRoute[] = [
  {
    path: ROUTE_PATHS.PRODUCTS.BASE(),
    component: ProductsListPage,
    exact: true
  },
  {
    path: ROUTE_PATHS.PRODUCTS.BY_ID(),
    component: ProductPage
  },
  {
    path: ROUTE_PATHS.BASKET.BASE(),
    component: BasketPage
  }
];

export const Routes = (route: TRoute) => {
  return <Route
    path={route.path}
    render={
      props => (
        <route.component {...props} routes={route.routes}/>
      )}
  />;
};