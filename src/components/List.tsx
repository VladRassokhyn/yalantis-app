import React from "react";
import { IProduct } from "../lib/types";

type P = {
  listArray: IProduct[],
  ItemComponent: any // React.FC<{item: IProduct | IBasket}>
}

export const List: React.FC<P> = ({ listArray, ItemComponent }) => {

  return <div className={'list-wrapper'}>
    {listArray.map((arrItem, i) => {
      return <ItemComponent key={i} item={arrItem}/>;
    })}
  </div>;
};
