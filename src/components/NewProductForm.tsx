import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NotificationTypes, RequestStatuses, TOrigin, TProductPostPayload } from '../lib/types';
import { useDispatch } from 'react-redux';
import {
  postProduct,
  statusResets,
  updateProduct
} from '../lib/store/productsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { notificationAdded } from '../lib/store/notoficationSlice';
import Select from 'react-select';

type TProps = {
  origins: TOrigin[];
  handleModal: () => void;
  newProductStatus: string;
  updateStatus: string;
  name: string;
  price: number;
  origin: string;
  productId?: string;
};

const schema = yup.object().shape({
  name: yup.string().required('Required').min(3, 'Min length is 3').max(20, 'Max length is 20'),
  price: yup.number().required('Required').positive().min(1, 'Can not be lower then 1'),
  origin: yup.string().required('Required')
});

export const NewProductForm: React.FC<TProps> = ({
                                                   updateStatus,
                                                   origins,
                                                   handleModal,
                                                   newProductStatus,
                                                   name,
                                                   price,
                                                   origin,
                                                   productId
                                                 }) => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      price: price,
      origin: origin
    }
  });

  const originOptions = React.useMemo(
    () =>
      origins.map((origin: TOrigin) => ({
        value: origin.value,
        label: origin.displayName
      })),
    [origins]
  );

  const disabled = newProductStatus === RequestStatuses.LOADING;
  const dispatch = useDispatch();

  const handleReset = React.useCallback(
    () =>
      reset({
        name: name,
        price: price,
        origin: origin
      }),
    [reset]
  );

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
    if (newProductStatus === RequestStatuses.SUCCESS || updateStatus === RequestStatuses.SUCCESS) {
      dispatch(
        notificationAdded({
          type: NotificationTypes.SUCCESS,
          label: `Saved`
        })
      );
      dispatch(statusResets('newProductStatus'));
      dispatch(statusResets('updateStatus'));
      handleModal();
    }
  }, [dispatch, newProductStatus, updateStatus]);

  return (
    <div className={'add-new-product__wrapper'}>
      <h1 className={'add-new-product__header'}>Add new product</h1>
      <div className={'add-new-product__content'}>
        <div className={'add-new-product__info'}>
          <h1>Product information</h1>

          <fieldset disabled={disabled}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={'add-new-product__inputs'}>
                  <label>
                    Name
                    {errors.name && <span className={'field-error-title'}>{errors.name.message}</span>}

                  </label>
                  <input
                    {...register('name')}
                  />

                <label>
                  Price
                  {errors.price && <span className={'field-error-title'}>{errors.price.message}</span>}

                </label>
                <input
                  {...register('price')}
                />

                <label>
                  Origin
                  {errors.origin && <span className={'field-error-title'}>{errors.origin.message}</span>}

                </label>

                <Controller
                  control={control}
                  defaultValue={originOptions[0].value}
                  name={'origin'}
                  render={({ field }) => (
                    <Select
                      menuPlacement={'top'}
                      className={`add-new-product__select`}
                      classNamePrefix={'react-select'}
                      inputRef={field.ref}
                      options={originOptions}
                      value={originOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(val) => field.onChange(val?.value)}
                    />
                  )}
                />
              </div>
            </form>
            <div className={'add-new-product__buttons'}>
              <button
                className={'add-to-basket-button'}
                onClick={handleSubmit(onSubmit)}
              >
                SAVE
              </button>
              {productId && <button className={'add-to-basket-button'} onClick={handleReset}>
                RESET
              </button>}
              <button className={'add-to-basket-button'} onClick={handleModal}>
                CANCEL
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
