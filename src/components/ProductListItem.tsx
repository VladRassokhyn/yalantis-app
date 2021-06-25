import React from "react";
import { AddToBasketButton } from "./AddToBasketButton";
import { IProduct } from "../lib/store/Products";
import defaultProductPhoto from "../static/defaultProductPhoto.svg";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../lib/router/routes";

export const ProductListItem: React.FC<{ item: IProduct }> = ({ item }) => {

  const photo = item.photo;

  return <div className={"product-item-wrapper"}>
    <Link to={ROUTE_PATHS.PRODUCTS.BY_ID({productId: item.id})}>
      <img
        className={"product-item-photo"}
        src={photo ? photo : defaultProductPhoto} alt={"image"}
      />
    </Link>
    <div className={"product-item-title"}>
      <Link to={ROUTE_PATHS.PRODUCTS.BY_ID({productId: item.id})}>
        <h1>{item.name}</h1>
      </Link>
      <h2>
        {item.price}$
        <AddToBasketButton product={item}/>
      </h2>
    </div>
  </div>;
};