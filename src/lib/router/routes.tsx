import React from 'react';
import { ProductsListPage } from '../../pages/ProductsListPage';
import { ProductPage } from '../../pages/ProductPage';
import { BasketPage } from '../../pages/BasketPage';
import { Route } from 'react-router-dom';
import { ROUTE_PATHS } from './paths';
import { OrdersPage } from '../../pages/OrdersPage';
import { OrderPage } from '../../pages/OrderPage';

type TRoute = {
  path: string;
  component: React.FC<{ routes: TRoute[] | undefined }>;
  routes?: TRoute[];
  exact?: boolean;
};

export const routes: TRoute[] = [
  {
    path: ROUTE_PATHS.PRODUCTS.BASE(),
    component: ProductsListPage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.MY_PRODUCTS.BASE(),
    component: ProductsListPage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.ORDERS.BASE(),
    component: OrdersPage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.ORDERS.BY_ID(),
    component: OrderPage,
    exact: true,
  },
  {
    path: ROUTE_PATHS.PRODUCTS.BY_ID(),
    component: ProductPage,
  },
  {
    path: ROUTE_PATHS.BASKET.BASE(),
    component: BasketPage,
  },
];

export const Routes = (route: TRoute) => {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};
