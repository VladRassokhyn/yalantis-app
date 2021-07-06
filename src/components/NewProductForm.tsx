import React from 'react';
import { useForm } from 'react-hook-form';
import { TOrigin } from '../lib/types';
import { useDispatch } from 'react-redux';
import { postProduct } from '../lib/store/productsSlice';

type TProps = {
  origins: TOrigin[]
}

export const NewProductForm: React.FC<TProps> = ({ origins }) => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    const product = {
      name: data.name,
      price: +data.price,
      origin: data.origin
    };
    dispatch(postProduct(product));
  }

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'add-new-product__inputs'}>

              <label>Name</label>
              <input
                {...register('name', { required: true })}
              />

              <label>Price</label>
              <input
                {...register('price', { required: true })}
              />

              <label>Origin</label>
              <select {...register('origin')}>
                {origins.map(option => {
                  return <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.displayName}
                  </option>
                })}
              </select>

            </div>
            <div className={'add-new-product__buttons'}>
              <button type={'submit'}>SAVE</button>
              <button>RESET</button>
              <button>CANCEL</button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};