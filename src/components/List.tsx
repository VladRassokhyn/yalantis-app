import React from 'react';
import { IProduct, IBasket } from '../lib/store/Products';

type TProps = {
  listArray: IProduct[] | IBasket[];
  ItemComponent: any; //({ item: IProduct | IBasket }) => JSX.Element
};

export const List: React.FC<TProps> = ({ listArray, ItemComponent }) => {
  return (
    <div className={'list-wrapper'}>
      {listArray.map((arrItem, i) => {
        return <ItemComponent key={i} item={arrItem} />;
      })}
    </div>
  );
};
