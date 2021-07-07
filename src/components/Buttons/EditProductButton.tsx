import React from 'react';
import { useSelector } from '../../lib/hooks/useSelector';
import { selectById, selectProductsOptions } from '../../lib/store/productsSlice';
import { useModal } from '../../lib/hooks/useModal';
import { NewProductForm } from '../NewProductForm';

export const EditProductButton: React.FC<{ productId: string }> = ({ productId }) => {

  const product = useSelector((state) => selectById(state, productId));
  if (!product) return null;
  const { origins, newProductStatus } = useSelector(selectProductsOptions);
  const { handleModal, Modal } = useModal();

  return (
    <>
      <button onClick={handleModal} className={'add-to-basket-button'}>
        EDIT
      </button>

      <Modal>
        <NewProductForm
          handleModal={handleModal}
          origins={origins}
          newProductStatus={newProductStatus}
          name={product.name}
          price={product.price}
          origin={product.origin}
          productId={productId}
        />
      </Modal>
    </>
  );
};