import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import basket from '../static/basket.svg';
<<<<<<< HEAD
import { useProductsState } from '../lib/store/Products';
=======
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984
import { ROUTE_PATHS } from '../lib/router/paths';
import { useSelector } from '../lib/hooks';
import { selectBasketOptions } from '../lib/store/basketSlice';

export const Header = () => {
<<<<<<< HEAD

  const isBasketPage = useLocation().pathname === ROUTE_PATHS.BASKET.BASE();
  const state = useProductsState();
  const [itemsInBasket, setItemsInBasket] = React.useState(0);

  React.useEffect(() => {
    let count = 0;
    state.basketItems.forEach((product) => {
      count += product.count
    })
    setItemsInBasket(count);
  }, [state.basketItems]);
=======
  const isBasketPage = useLocation().pathname === ROUTE_PATHS.BASKET.BASE();

  const { totalCount } = useSelector(selectBasketOptions);
>>>>>>> 8e49aec1be6aef715ee39c6b062ebeb8c8113984

  return (
    <div className={'main-header'}>
      <Link to={ROUTE_PATHS.PRODUCTS.BASE()}>
        <div className={'nav-button'}>
          <h1>PRODUCTS</h1>
        </div>
      </Link>
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
