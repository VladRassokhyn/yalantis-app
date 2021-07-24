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
  origins: string[];
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
  let origins: string[] = [];
  options.origins &&
    options.origins.forEach((origin) => {
      origins.push(origin.value);
    });

  const query: Params = {
    page: options.page,
    perPage: options.perPage,
    minPrice: options.minPrice,
    maxPrice: options.maxPrice,
    origins,
  };

  const currentParams = getQueryParameters(location.search);

  Object.keys(query).forEach((param) => {
    console.log(param, ': ', query[param])
    if (!query[param] && currentParams[param]) {
      query[param] = currentParams[param];
    }
  });

  let search = '';
  let j = 0;
  let separator = '?';

  Object.keys(query).forEach((key) => {
    if (query[key] && query[key].length !== 0) {
      if (j !== 0) {
        separator = '&';
      }
      if (Array.isArray(query[key])) {
        search += `${separator}${key}=${query[key] + ''}`;
      } else {
        search += `${separator}${key}=${query[key]}`;
      }
      j++;
    }
  });

  if (location.search !== search) {
    history.pushState(null, '', search);
  }

  if (!query.page) query.page = 1;
  if (!query.perPage) query.perPage = 50;
  if (!query.minPrice) query.minPrice = 1;
  if (!query.maxPrice) query.maxPrice = 1000;
  if (!query.origins) query.origins = [];

  query.editable = location.pathname === ROUTE_PATHS.MY_PRODUCTS.BASE()

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
