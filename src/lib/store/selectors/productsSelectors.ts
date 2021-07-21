import { RootState } from '../store';
import { productsAdapter } from '../productsSlice';

export const { selectById, selectIds } =
  productsAdapter.getSelectors<RootState>((state) => state.products.items);

export const selectProductsOptions = (state: RootState) => ({
  page: state.products.page,
  perPage: state.products.perPage,
  totalItems: state.products.totalItems,
  status: state.products.status,
  statusOrigins: state.products.statusOrigins,
  newProductStatus: state.products.newProductStatus,
  origins: state.products.origins,
  filterOrigins: state.products.filterOrigins,
  minPrice: state.products.minPrice,
  maxPrice: state.products.maxPrice,
  filterPrice: state.products.filterPrice,
  deleteStatus: state.products.deleteStatus,
  updateStatus: state.products.updateStatus,
});
