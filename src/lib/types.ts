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
  totalItems: number,
  basketItems: TProduct[],
}

export type TBasketState = {
  items: TProduct[]
}

// eslint-disable-next-line no-unused-vars
export type TDispatch = (action: Actions) => void

export type ResponseGetProducts = {data: {items: TProduct[], totalItems: number}}

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  SET_PRODUCTS = "products/SET_PRODUCTS",
  // eslint-disable-next-line no-unused-vars
  SET_CURRENT_PAGE = "products/SET_CURRENT_PAGE",
  // eslint-disable-next-line no-unused-vars
  SET_IS_LOADING = "products/SET_IS_LOADING",
  // eslint-disable-next-line no-unused-vars
  ADD_PRODUCT_TO_BASKET = "products/ADD_PRODUCT_TO_BASKET"
  // eslint-disable-next-line no-unused-vars
}


export type Actions = TSetCurrentPage | TSetProducts | TSetIsLoading | TAddProductToBasket

export type TSetProducts = { type: ActionTypes.SET_PRODUCTS, items: TProduct[], totalItems: number };
export type TSetCurrentPage = { type: ActionTypes.SET_CURRENT_PAGE, page: number };
export type TSetIsLoading = { type: ActionTypes.SET_IS_LOADING, isLoading: boolean };
export type TAddProductToBasket = { type: ActionTypes.ADD_PRODUCT_TO_BASKET, product: TProduct }