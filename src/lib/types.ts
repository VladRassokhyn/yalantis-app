export interface IProduct {
  isEditable: boolean,
  id: string,
  name: string,
  price: number,
  origin: string,
  createdAt: string,
  updatedAt: string
  photo?: string
}

export interface IBasket extends IProduct{
  count: number
}

export type TProductState = {
  isLoading: boolean
  page: number,
  perPage: number,
  items: IProduct[],
  totalItems: number,
  basketItems: IBasket[],
}


// eslint-disable-next-line no-unused-vars
export type TDispatch = (action: Actions) => void

export type ResponseGetProducts = {data: {items: IProduct[], totalItems: number}}
export type ResponseGetProduct = {data: IProduct}

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  SET_PRODUCTS = "products/SET_PRODUCTS",
  // eslint-disable-next-line no-unused-vars
  SET_PRODUCTS_PER_PAGE = "products/SET_PRODUCTS_PER_PAGE",
  // eslint-disable-next-line no-unused-vars
  SET_CURRENT_PAGE = "products/SET_CURRENT_PAGE",
  // eslint-disable-next-line no-unused-vars
  SET_IS_LOADING = "products/SET_IS_LOADING",
  // eslint-disable-next-line no-unused-vars
  ADD_PRODUCT_TO_BASKET = "products/ADD_PRODUCT_TO_BASKET",
  // eslint-disable-next-line no-unused-vars
  ADD_NOTIFICATION = "products/ADD_NOTIFICATION",
  // eslint-disable-next-line no-unused-vars
  DELETE_NOTIFICATION = "products/DELETE_NOTIFICATION",
}


export type Actions =
  TSetCurrentPage |
  TSetProducts |
  TSetIsLoading |
  TAddProductToBasket |
  TSetProductsPerPage

export type TSetProducts = { type: ActionTypes.SET_PRODUCTS, items: IProduct[], totalItems: number };
export type TSetCurrentPage = { type: ActionTypes.SET_CURRENT_PAGE, page: number };
export type TSetProductsPerPage = { type: ActionTypes.SET_PRODUCTS_PER_PAGE, perPage: number };
export type TSetIsLoading = { type: ActionTypes.SET_IS_LOADING, isLoading: boolean };
export type TAddProductToBasket = { type: ActionTypes.ADD_PRODUCT_TO_BASKET, product: IProduct }

