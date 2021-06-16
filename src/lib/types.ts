export type TProduct = {
  isEditable: boolean,
  id: string,
  name: string,
  price: number,
  origin: string,
  createdAt: string,
  updatedAt: string
  photo?: string
}

export type TProductState = {
  isLoading: boolean
  page: number,
  perPage: number,
  items: TProduct[],
  totalItems: number | null
}

export type TBasketState = {
  items: TProduct[]
}

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  SET_PRODUCTS = "products/SET_PRODUCTS",
  // eslint-disable-next-line no-unused-vars
  SET_CURRENT_PAGE = "products/SET_CURRENT_PAGE",
  // eslint-disable-next-line no-unused-vars
  SET_IS_LOADING = "products/SET_IS_LOADING",
  // eslint-disable-next-line no-unused-vars
  ADD_PRODUCT = "basket/ADD_PRODUCT"
  // eslint-disable-next-line no-unused-vars
}