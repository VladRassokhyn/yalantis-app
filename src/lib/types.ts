import { EntityState } from '@reduxjs/toolkit';

export type FixThisTypeLeter = any

export type TNotification = {
  type: NotificationTypes;
  isActive: boolean;
  id: string;
  label: string;
};

export enum NotificationTypes {
  SUCCESS =  'success',
  ERROR = 'error'
}

export enum RequestStatuses {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

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
  status: RequestStatuses;
  error: string;
  product: IProduct;
};

interface S {
  [prop: string]: any;
}

export interface IInitialProducts extends S {
  status: RequestStatuses;
  statusOrigins: RequestStatuses;
  newProductStatus: RequestStatuses;
  deleteStatus: RequestStatuses;
  updateStatus: RequestStatuses;
  newProductError: string | null
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
}

export type TInitialOrders = {
  postStatus: RequestStatuses;
  error: string;
  singleOrderStatus: RequestStatuses;
  getOrdersStatus: RequestStatuses;
  orders: EntityState<TOrder>;
  singleOrder: TOrder | null;
};

export type TInitialBasket = {
  totalPrice: number;
  totalCount: number;
  items: EntityState<IBasket>;
  toOrder: EntityState<TNewOrderPiece>;
};

export type TOrderPiece = { product: IProduct; count: number };

export type TOrder = {
  id: string;
  pieces: TOrderPiece[];
  createdAt: string;
};

export type TNewOrderPiece = {
  productId: string;
  count: number;
};

export type TNewOrder = {
  order: {
    pieces: TNewOrderPiece[];
  };
};

export type TReqProductsArgs = {
  page: number;
  perPage: number;
  origins: string[];
  minPrice: number;
  maxPrice: number;
  editable: boolean;
};

export interface IBasket extends IProduct {
  count: number;
}

export type TOrigin = {
  value: string;
  displayName: string;
};

export type ResponseGetProducts = {
  data: { items: IProduct[]; totalItems: number };
};
export type ResponseGetOrigins = {
  data: { items: TOrigin[] };
};
export type ResponseGetProduct = { data: IProduct };

export type TProductPostPayload = {
  name: string;
  price: number;
  origin: string;
};

export type ResponsePostNewOrder = { data: TOrder };
export type ResponseGetOrders = { data: { items: TOrder[] } };
export type ResponseGetOrder = { data: TOrder[] };
