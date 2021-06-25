import { IProduct } from "./store/Products"
import { TActions as TProductActions, TProductState } from "./store/Products/types";
import { TNotification } from "./store/Notificator";
import { Dispatch } from "react";
import { TActions as TNotifyActions} from "./store/Notificator/types";

export type TGlobalState = {
  ProductsState: TProductState
  NotifiState: TNotification[]
}

export type TGlobalDispatch = {
  ProductsDispatch: Dispatch<TProductActions>
  NotifiDispatch: Dispatch<TNotifyActions>
}

export type TAppContext = {
  state: TGlobalState,
  dispatch: TGlobalDispatch
}

export type ResponseGetProducts = {data: {items: IProduct[], totalItems: number}}
export type ResponseGetProduct = {data: IProduct}
