import React from 'react';
import { useParams } from 'react-router-dom';
import { clientAPI } from '../lib/api/api';
import { IProduct } from '../lib/types';
import { format } from 'date-fns';
import { Product } from '../components/Product';
import { ProductPrototype } from '../common/ProductPrototype';

const initialState = {
  isEditable: false,
  id: '',
  name: '',
  price: 0,
  origin: '',
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  photo: '',
};

export const ProductPage = () => {
  const [product, setProduct] = React.useState<IProduct>(initialState);
  const [isLoading, setIsLoading] = React.useState(true);

  const params = useParams<{ productId: string }>();

  const createdAt = format(new Date(product.createdAt), 'HH:mm - dd.mm.yyyy');
  const updatedAt = format(new Date(product.updatedAt), 'HH:mm - dd.mm.yyyy');

  React.useEffect(() => {
    setIsLoading(true);
    clientAPI.getProduct(params.productId).then((res) => {
      setProduct(res.data);
      setIsLoading(false);
    });
  }, [params]);

  if (isLoading) {
    return <ProductPrototype />;
  } else {
    return (
      <Product product={product} createdAt={createdAt} updatedAt={updatedAt} />
    );
  }
};
