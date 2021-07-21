import React from 'react';
import { useSelector } from '../../lib/hooks/useSelector';
import {
  selectProductsOptions,
} from '../../lib/store/selectors';
import { useModal } from '../../lib/hooks/useModal';
import { NewProductForm } from '../NewProductForm';
import { IProduct } from '../../lib/types';

export const EditProductButton: React.FC<{ product: IProduct }> = ({
 product,
}) => {
  const { origins, newProductStatus, updateStatus } = useSelector(
    selectProductsOptions
  );
  const { handleModal, Modal } = useModal();

  return (
    <>
      <button onClick={handleModal} className={'add-to-basket-button'}>
        EDIT
      </button>

      <Modal>
        <NewProductForm
          updateStatus={updateStatus}
          handleModal={handleModal}
          origins={origins}
          newProductStatus={newProductStatus}
          name={product.name}
          price={product.price}
          origin={product.origin}
          productId={product.id}
        />
      </Modal>
    </>
  );
};
