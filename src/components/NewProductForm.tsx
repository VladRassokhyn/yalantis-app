import React from 'react';
import { useForm } from 'react-hook-form';
import { TOrigin, TProductPostPayload } from '../lib/types';
import { useDispatch } from 'react-redux';
import { postProduct, statusResets, updateProduct } from '../lib/store/productsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { notificationAdded } from '../lib/store/notoficationSlice';

type TProps = {
  origins: TOrigin[]
  handleModal: () => void
  newProductStatus: string
  name: string
  price: number
  origin: string
  productId?: string
}

const schema = yup.object().shape({
  name: yup.string().required().min(3).max(20),
  price: yup.number().required().positive().min(1),
  origin: yup.string().required()
});

export const NewProductForm: React.FC<TProps> = (
  {
    origins,
    handleModal,
    newProductStatus,
    name,
    price,
    origin,
    productId
  }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      price: price,
      origin: origin
    }
  });

  const disabled = newProductStatus === 'loading';
  const dispatch = useDispatch();

  const handleReset = () => reset({
    name: name,
    price: price,
    origin: origin
  });

  const onSubmit = (data: TProductPostPayload) => {
    const product = {
      name: data.name,
      price: +data.price,
      origin: data.origin
    };
    if (productId) {
      dispatch(updateProduct({ id: productId, product }));
    } else {
      dispatch(postProduct(product));
    }
  };

  React.useEffect(() => {
    if (formState.errors.name) {
      dispatch(notificationAdded({
        type: 'error',
        label: `Error: ${formState.errors.name.message}`
      }));
    }
    if (formState.errors.price) {
      dispatch(notificationAdded({
        type: 'error',
        label: `Error: ${formState.errors.price.message}`
      }));
    }
    if (formState.errors.origin) {
      dispatch(notificationAdded({
        type: 'error',
        label: `Error: ${formState.errors.origin.message}`
      }));
    }
    if (newProductStatus === 'success') {
      dispatch(notificationAdded({
        type: 'success',
        label: `Saved`
      }));
      dispatch(statusResets('newProductStatus'));
      handleModal();
    }
  }, [formState.errors, dispatch, newProductStatus]);

  return (
    <div className={'add-new-product__wrapper'}>
      <h1 className={'add-new-product__header'}>
        Add new product
      </h1>
      <div className={'add-new-product__content'}>
        <div className={'add-new-product__photo'}>
          <h1>Product Photo</h1>
        </div>
        <div className={'add-new-product__info'}>
          <h1>Product information</h1>

          <fieldset disabled={disabled}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={'add-new-product__inputs'}>

                <label>Name</label>
                <input
                  className={formState.errors.name && 'add-new-product__error-field'}
                  {...register('name', { required: true })}
                />

                <label>Price</label>
                <input
                  className={formState.errors.price && 'add-new-product__error-field'}
                  {...register('price', { required: true })}
                />

                <label>Origin</label>
                <select
                  {...register('origin')}
                >
                  {origins.map(option => {
                    return <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.displayName}
                    </option>;
                  })}
                </select>

              </div>
            </form>
            <div className={'add-new-product__buttons'}>
              <button
                className={'add-to-basket-button'}
                onClick={handleSubmit(onSubmit)}
              >SAVE
              </button>
              <button
                className={'add-to-basket-button'}
                onClick={handleReset}
              >RESET
              </button>
              <button
                className={'add-to-basket-button'}
                onClick={handleModal}
              >CANCEL
              </button>
            </div>
          </fieldset>
        </div>

      </div>
    </div>
  );
};