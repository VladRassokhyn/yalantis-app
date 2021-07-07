import { pathMaker } from './pathMaker';

export const ROUTE_PATHS = {
  PRODUCTS: {
    BASE: pathMaker('/products'),
    BY_ID: pathMaker('/products/:productId'),
  },
  BASKET: {
    BASE: pathMaker('/basket'),
  },
  MY_PRODUCTS: {
    BASE: pathMaker('/my-products')
  },
  ORDERS: {
    BASE: pathMaker('/orders'),
    BY_ID: pathMaker('/orders/:orderId')
  }
};
