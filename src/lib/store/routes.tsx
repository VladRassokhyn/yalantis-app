import React from "react";
import { ProductsListPage } from "../../pages/ProductsListPage";
import { ProductPage } from "../../pages/ProductPage";
import { Basket } from "../../pages/Basket";
import { Route } from "react-router-dom";

type TRoute = {
  path: string
  component: any
  routes?: TRoute[]
  exact?: boolean
}

export const routes: TRoute[] = [
  {
    path: '/products',
    component: ProductsListPage,
    exact: true
  },
  {
    path: '/products/:productId',
    component: ProductPage
  },
  {
    path: '/basket',
    component: Basket
  }
]

export const Routes = (route:TRoute) => {
  return <Route
    path={route.path}
    render={
      props => (
        <route.component {...props} routes={route.routes}/>
      )}
      />
}