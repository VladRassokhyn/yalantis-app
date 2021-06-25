import React from "react";
import { IProduct } from "../lib/store/Products";

type TProps = {
  listArray: IProduct[],
  ItemComponent: any // React.FC<{item: IProduct | IBasket}>
}

export const List: React.FC<TProps> = ({ listArray, ItemComponent }) => {

  return <div className={'list-wrapper'}>
    {listArray.map((arrItem, i) => {
      return <ItemComponent key={i} item={arrItem}/>;
    })}
  </div>;
};
