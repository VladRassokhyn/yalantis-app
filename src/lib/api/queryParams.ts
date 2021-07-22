import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TReqProductsArgs } from '../types';

interface S {
  [p: string]: any
}

interface Params extends S {
  page: number
  perPage: number
  minPrice: number
  maxPrice: number
  origins: string[] | null
}

type filterOptions = {
  page: number,
  perPage: number,
  minPrice: number,
  maxPrice: number,
  filterOrigins: string[] | null
}

export const updateQueryParams = ({page, perPage, minPrice, maxPrice, filterOrigins}: filterOptions) => {
  const location = useLocation();
  const history = useHistory();

  const query: Params = {
    page,
    perPage,
    minPrice,
    maxPrice,
    origins: filterOrigins
  };

  let search = '';
  let j = 0;
  let separator = '?';

  Object.keys(query).forEach(key => {
    if (query[key] && query[key].length !== 0) {

      if (j !== 0) {
        separator = '&';
      }
        if (Array.isArray(query[key])){
          search += `${separator}${key}=${query[key] + ''}`;
          console.log(filterOrigins, query[key])
        } else {
          search += `${separator}${key}=${query[key]}`;
        }
      j++;
    }
  });

  const queryString = `${location.pathname}${search}`;

  React.useEffect(() => {
    if (location.pathname !== queryString) {
      history.replace(queryString);
    }
  }, [page, perPage, maxPrice, minPrice, filterOrigins]);
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

  console.log(currentParameters)
  return currentParameters;
}

export const makeRequestUrl = (params: TReqProductsArgs) => {
  let requestUrl = '';
  let j = 0;
  let separator = '?';

  Object.keys(params).forEach(key => {
    if (params[key] && params[key].length !== 0) {

      if (j !== 0) {
        separator = '&';
      }

      if (Array.isArray(params[key])){
        requestUrl += `${separator}${key}=${params[key] + ''}`;
      } else {
        requestUrl += `${separator}${key}=${params[key]}`;
      }
      j++;
    }
  });

  return requestUrl
}