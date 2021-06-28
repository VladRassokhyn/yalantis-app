import React from 'react';
import { productState } from './reducer';
import { TDispatch, TProductState } from './types';

export const ProductStateContext =
  React.createContext<TProductState>(productState);
export const ProductDispatchContext = React.createContext<TDispatch>(() => {});
