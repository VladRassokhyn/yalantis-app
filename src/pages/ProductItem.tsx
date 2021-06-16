import React from "react";
import { AddToBasketButton } from "../common/AddToBasketButton";
import { TProduct } from "../lib/types";
import defaultProductPhoto from "../static/defaultProductPhoto.svg";

export const ProductItem: React.FC<{ item: TProduct }> = ({ item }) => {

  const photo = item.photo;

  return <div className={"product-item-wrapper"}>
    <img className={"product-item-photo"} src={photo ? photo : defaultProductPhoto} alt={"image"}/>
    <div className={"product-item-title"}>
      <h1>{item.name}</h1>
      <h2>
        {item.price}$
        <AddToBasketButton product={item}/>
      </h2>
    </div>
  </div>;
};