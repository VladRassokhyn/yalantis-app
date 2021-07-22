import { RootState } from '../store';

export const selectSingleProduct = (state: RootState) => ({
  product: state.singleProduct.product,
  status: state.singleProduct.status,
});
