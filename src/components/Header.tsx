import React from "react";
import { Link, useLocation } from "react-router-dom";
import basket from "../static/basket.svg";
import { useProductsContext } from "../lib/store/Products";

export const Header = () => {

  const isBasketPage = useLocation().pathname === "/basket";
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch ] = useProductsContext();
  let itemsInBasket= 0

  state.basketItems.forEach((product: any) => {
    itemsInBasket += product.count
  })

  return <div className={"main-header"}>
    <Link to={"/products"}>
      <div className={"nav-button"}>
        <h1>PRODUCTS</h1>
      </div>
    </Link>
    {isBasketPage ? <div/> : <Link to={"/basket"}>
      <div className={"nav-button"}>
        <img src={basket} alt={"basket"}/>
        {itemsInBasket > 0 && <span>{itemsInBasket}</span>}
      </div>
    </Link>
    }
  </div>;
};