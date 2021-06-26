import { useAppContext } from '../context';

export const useProductsContext = () => {
  const { state, dispatch } = useAppContext();
  return [state.ProductsState, dispatch.ProductsDispatch] as const;
};

export const useProductsDispatch = () => {
  const store = useAppContext();
  return store.dispatch.ProductsDispatch
}

export const useProductsState = () => {
  const store = useAppContext();
  return store.state.ProductsState
}
