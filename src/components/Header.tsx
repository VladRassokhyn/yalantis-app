import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {

  return <div className={'main-header'}>
    <Link to={'/products'}>
      <div className={'nav-button'}>
        <h1>PRODUCTS</h1>
      </div>
    </Link>
  </div>;
};