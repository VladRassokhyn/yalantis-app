import { TReqProductsArgs } from '../types';
import { ROUTE_PATHS } from '../router/paths';

interface S {
  [p: string]: any;
}

interface Params extends S {
  page: number;
  perPage: number;
  minPrice: number;
  maxPrice: number;
  origins: string[] | null;
}

type filterOptions = {
  page: number;
  perPage: number;
  minPrice: number;
  maxPrice: number;
  origins: {
    value: string;
    label: string;
  }[];
};

export const updateQueryParams = (options: filterOptions) => {
  const query: Params = {
    page: options.page,
    perPage: options.perPage,
    minPrice: options.minPrice,
    maxPrice: options.maxPrice,
    origins: options.origins ? options.origins.map((o) => o.value) : null,
  };

  const currentParams = getQueryParameters(location.search);

  Object.keys(query).forEach((param) => {
    let current = currentParams[param];
    if (current) {
      if (!query[param]) {
        query[param] = current;
      }
      if (param === 'origins' && !query[param]) {
        query[param] = current.split(',');
      }
    }
  });

  const search = makeRequestUrl(query as TReqProductsArgs);

  if (location.search !== search) {
    history.pushState(null, '', search);
  }

  if (!query.page) query.page = 1;
  if (!query.perPage) query.perPage = 50;
  if (!query.minPrice) query.minPrice = 1;
  if (!query.maxPrice) query.maxPrice = 1000;
  if (!query.origins) query.origins = [];

  query.editable = location.pathname === ROUTE_PATHS.MY_PRODUCTS.BASE();

  return query;
};

export const getQueryParameters = (search: string) => {
  let parameters: string | string[] = search.replace('?', '');

  let currentParameters: TReqProductsArgs = {} as TReqProductsArgs;

  if (Object.keys(parameters).length) {
    parameters = parameters.split('&');

    for (let i = 0; i < parameters.length; i++) {
      let parameter = parameters[i].split('=');
      currentParameters[parameter[0]] = parameter[1];
    }
  }

  return currentParameters;
};

export const makeRequestUrl = (params: TReqProductsArgs) => {
  let requestUrl = '';
  let j = 0;
  let separator = '?';

  Object.keys(params).forEach((key) => {
    if (params[key] && params[key].length !== 0) {
      if (j !== 0) {
        separator = '&';
      }

      if (Array.isArray(params[key])) {
        requestUrl += `${separator}${key}=${params[key] + ''}`;
      } else {
        requestUrl += `${separator}${key}=${params[key]}`;
      }
      j++;
    }
  });

  return requestUrl;
};
