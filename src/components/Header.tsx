import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import basket from '../static/basket.svg';
import { ROUTE_PATHS } from '../lib/router/paths';
import { useSelector } from '../lib/hooks/useSelector';
import { selectBasketOptions } from '../lib/store/basketSlice';
import { useModal } from '../lib/hooks/useModal';
import { NewProductForm } from './NewProductForm';

export const Header = () => {
  const isBasketPage = useLocation().pathname === ROUTE_PATHS.BASKET.BASE();

  const { totalCount } = useSelector(selectBasketOptions);

  const { handleModal, Modal } = useModal();

  return (
    <div className={'main-header'}>
      <Link to={ROUTE_PATHS.PRODUCTS.BASE()}>
        <div className={'nav-button'}>
          <h1>PRODUCTS</h1>
        </div>
      </Link>

      <button onClick={handleModal}>
        Modal Button
      </button>

      <Modal>
        <NewProductForm/>
      </Modal>

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