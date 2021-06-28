import { pathMaker } from './pathMaker';

export const ROUTE_PATHS = {
  PRODUCTS: {
    BASE: pathMaker('/products'),
    BY_ID: pathMaker('/products/:productId'),
  },
  BASKET: {
    BASE: pathMaker('/basket'),
  },
};
