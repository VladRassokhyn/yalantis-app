import React from "react";
import { IProduct } from "../lib/types";

type P = {
  listArray: IProduct[],
  ItemComponent: React.FC<{item: IProduct}>
}

export const List: React.FC<P> = ({ listArray, ItemComponent }) => {

  return <div className={'list-wrapper'}>
    {listArray.map((arrItem, i) => {
      return <ItemComponent key={i} item={arrItem}/>;
    })}
  </div>;
};
