import { useAppContext } from "../context";

export const useProductsContext = () => {
  const { state, dispatch } = useAppContext();
  return [state.ProductsState, dispatch.ProductsDispatch] as const
}