import React from "react";
import { Link } from "react-router-dom";
import basket from '../static/basket.svg'

export const Header = () => {

  return <div className={'main-header'}>
    <Link to={'/products'}>
      <div className={'nav-button'}>
        <h1>PRODUCTS</h1>
      </div>
    </Link>
    <Link to={'/basket'}>
      <div className={'nav-button'}>
        <img src={basket} alt={'basket'}/>
      </div>
    </Link>
  </div>;
};