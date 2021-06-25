import React from "react";
import { Link, useLocation } from "react-router-dom";
import basket from "../static/basket.svg";
import { useProductsContext } from "../lib/store/Products";
import { ROUTE_PATHS } from "../lib/router/paths";

export const Header = () => {

  const isBasketPage = useLocation().pathname === "/basket";
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useProductsContext();
  let itemsInBasket = 0;

  React.useMemo(() => state.basketItems.forEach(product => {
    console.log("rerender");
    itemsInBasket += product.count;
  }), [state.basketItems]);

  return <div className={"main-header"}>
    <Link to={ROUTE_PATHS.PRODUCTS.BASE()}>
      <div className={"nav-button"}>
        <h1>PRODUCTS</h1>
      </div>
    </Link>
    {isBasketPage ? <div/> : <Link to={ROUTE_PATHS.BASKET.BASE()}>
      <div className={"nav-button"}>
        <img src={basket} alt={"basket"}/>
        {itemsInBasket > 0 && <span>{itemsInBasket}</span>}
      </div>
    </Link>
    }
  </div>;
};