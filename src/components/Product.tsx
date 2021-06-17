import React from "react";
import defaultProductPhoto from "../static/defaultProductPhoto.svg";
import { AddToBasketButton } from "../common/AddToBasketButton";
import { TProduct } from "../lib/types";

type P = {
  product: TProduct
  createdAt: string
  updatedAt: string
}

export const Product: React.FC<P> = ({product, createdAt, updatedAt}) => {

  return <div className={"product-wrapper"}>
    <div className={"product-container"}>
      <h1>{product.name}</h1>
      <div className={"product-description-container"}>
        <div className={"product-image-wrapper"}>
          <img src={`${product.photo ? product.photo : defaultProductPhoto}`} alt={"image"}/>
        </div>
        <div className={"product-description"}>
          <h2><b>Origin:</b> {product.origin}</h2>
          <h2><b>Created:</b> {createdAt}</h2>
          <h2><b>Updated:</b> {updatedAt}</h2>
          <div className={'product-price-container'}>
            <h1>{product.price}$</h1>
            <AddToBasketButton product={product}>ADD</AddToBasketButton>
          </div>
        </div>
      </div>
    </div>
  </div>
}