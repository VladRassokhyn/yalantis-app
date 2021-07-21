import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import basket from '../static/basket.svg';
import { ROUTE_PATHS } from '../lib/router/paths';
import { useSelector } from '../lib/hooks/useSelector';
import { selectBasketOptions } from '../lib/store/selectors';
import { useModal } from '../lib/hooks/useModal';
import { NewProductForm } from './NewProductForm';
import { selectProductsOptions } from '../lib/store/selectors';

export const Header = () => {
  const isBasketPage = useLocation().pathname === ROUTE_PATHS.BASKET.BASE();

  const { totalCount } = useSelector(selectBasketOptions);

  const { handleModal, Modal } = useModal();

  const { origins, newProductStatus, updateStatus } = useSelector(
    selectProductsOptions
  );

  return (
    <div className={'main-header'}>
      <div className={'navigation'}>
        <Link to={ROUTE_PATHS.PRODUCTS.BASE()}>
          <div className={'nav-button'}>
            <h1>PRODUCTS</h1>
          </div>
        </Link>

        <Link to={ROUTE_PATHS.ORDERS.BASE()}>
          <div className={'nav-button'}>
            <h1>MY ORDERS</h1>
          </div>
        </Link>

        <Link to={ROUTE_PATHS.MY_PRODUCTS.BASE()}>
          <div className={'nav-button'}>
            <h1>MY PRODUCTS</h1>
          </div>
        </Link>

        <div className={'nav-button'} onClick={handleModal}>
          <h1>ADD PRODUCT</h1>
        </div>

        <Modal>
          <NewProductForm
            updateStatus={updateStatus}
            handleModal={handleModal}
            origins={origins}
            newProductStatus={newProductStatus}
            name={''}
            price={0}
            origin={''}
          />
        </Modal>
      </div>
      {isBasketPage ? (
        <div />
      ) : (
        <Link to={ROUTE_PATHS.BASKET.BASE()}>
          <div className={'nav-button'}>
            <img src={basket} alt={'basket'} />
            {totalCount > 0 && <span>{totalCount}</span>}
          </div>
        </Link>
      )}
    </div>
  );
};
