import React from "react";
import { Link, useLocation } from "react-router-dom";
import basket from "../static/basket.svg";

export const Header = () => {

  const isBasketPage = useLocation().pathname === "/basket";

  return <div className={"main-header"}>
    <Link to={"/products"}>
      <div className={"nav-button"}>
        <h1>PRODUCTS</h1>
      </div>
    </Link>
    {isBasketPage ? <div/> : <Link to={"/basket"}>
      <div className={"nav-button"}>
        <img src={basket} alt={"basket"}/>
      </div>
    </Link>
    }
  </div>;
};