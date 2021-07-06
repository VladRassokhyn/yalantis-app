import { EntityState } from '@reduxjs/toolkit';

export type TNotification = {
  type: string;
  isActive: boolean;
  id: string;
  label: string;
};

export interface IProduct {
  isEditable: boolean;
  id: string;
  name: string;
  price: number;
  origin: string;
  createdAt: string;
  updatedAt: string;
  photo?: string;
}

export type TSingleProductState = {
  status: string;
  error: string;
  product: IProduct;
};

interface S {
  [prop: string]: any
}

export interface IInitialProducts extends S {
  status: string;
  statusOrigins: string;
  newProductStatus: string
  page: number;
  perPage: number;
  totalItems: number;
  items: EntityState<IProduct>;
  error: null;
  origins: TOrigin[];
  filterOrigins: TOrigin[] | null;
  minPrice: number;
  maxPrice: number;
  filterPrice: {
    min: number;
    max: number;
  };
};

export type TReqProductsArgs = {
  page: number;
  perPage: number;
  origins: string[];
  minPrice: number;
  maxPrice: number;
  editable: boolean
};

export interface IBasket extends IProduct {
  count: number;
}

export type TOrigin = {
  value: string
  displayName: string
}

export type ResponseGetProducts = {
  data: { items: IProduct[]; totalItems: number };
};
export type ResponseGetOrigins = {
  data: { items: TOrigin[];};
};
export type ResponseGetProduct = { data: IProduct };

export type TProductPostPayload = {
  name: string
  price: number
  origin: string
}
