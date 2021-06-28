import { EntityState } from "@reduxjs/toolkit";

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

export type TInitialProducts = {
  status: string,
  page: number,
  perPage: number,
  totalItems: number,
  items: EntityState<IProduct>,
  error: null,
  origins: string[]
  filterOrigins: string[] | null
}

export interface IBasket extends IProduct {
  count: number;
}

export type ResponseGetProducts = {
  data: { items: IProduct[]; totalItems: number };
};
export type ResponseGetProduct = { data: IProduct };
