import React from 'react';
import { useSelector } from '../lib/hooks/useSelector';
import { selectById } from '../lib/store/productsSlice';

export const DeleteProductButton: React.FC<{ productId: string }> = ({ productId }) => {

  const product = useSelector((state) => selectById(state, productId));
  if (!product) return null;

  const handleClick = () => {

  }

  return (
    <>
      <button onClick={handleClick} className={'add-to-basket-button'}>
        DELETE
      </button>
    </>
  );
};