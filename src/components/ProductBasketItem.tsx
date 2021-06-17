import React from "react";
import { IBasket } from "../lib/types";
import defaultProductPhoto from '../static/defaultProductPhoto.svg';

export const ProductBasketItem: React.FC<{ item: IBasket }> = ({item}) => {

  return <div className={'basket-item-wrapper'}>
    <img src={item.photo ? item.photo : defaultProductPhoto} alt={'image'}/>
    <div className={'basket-item-title-container'}>
      <h1>{item.name}</h1>
      <h2><b>Price:</b> {item.price}$</h2>
      <h2><b>Count:</b> {item.count}</h2>
    </div>
    <div className={'basket-item-total-container'}>
      <h1>Total Price</h1>
      <h2>{item.price * item.count}$</h2>
    </div>
  </div>
}