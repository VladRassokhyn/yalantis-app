import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Product } from '../components/Product';
import { ProductPrototype } from '../common/ProductPrototype';
import {
  getSingleProduct,
  selectSingleProduct,
} from '../lib/store/singleProductSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from '../lib/hooks/useSelector';
import { selectProductsOptions } from '../lib/store/productsSlice';

export const ProductPage = () => {
  const { product, status } = useSelector(selectSingleProduct);
  const { updateStatus } = useSelector(selectProductsOptions);
  const dispatch = useDispatch();
  const params = useParams<{ productId: string }>();

  const createdAt = format(new Date(product.createdAt), 'HH:mm - dd.mm.yyyy');
  const updatedAt = format(new Date(product.updatedAt), 'HH:mm - dd.mm.yyyy');

  React.useEffect(() => {
    dispatch(getSingleProduct(params.productId));
  }, [params, dispatch]);

  React.useEffect(() => {
    if (updateStatus === 'success') {
      dispatch(getSingleProduct(params.productId));
    }
  }, [updateStatus]);

  if (status !== 'success') {
    return <ProductPrototype />;
  } else {
    return (
      <Product product={product} createdAt={createdAt} updatedAt={updatedAt} />
    );
  }
};
