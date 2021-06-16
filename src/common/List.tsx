import React from "react";
import { TProduct } from "../lib/types";

type P = {
  listArray: TProduct[],
  ItemComponent: React.FC<{item: TProduct}>
}

export const List: React.FC<P> = ({ listArray, ItemComponent }) => {

  return <div className={'list-wrapper'}>
    {listArray.map((arrItem, i) => {
      return <ItemComponent key={i} item={arrItem}/>;
    })}
  </div>;
};
