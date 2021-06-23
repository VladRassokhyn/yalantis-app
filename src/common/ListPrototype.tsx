import React from "react";

export const ListPrototype: React.FC<{listLength: number}> = ({listLength}) => {

  const list: number[] = new Array(listLength);

  return <div className={'list-wrapper'}>
    {list.map((arrItem, i) => {
      return<div key={i} className={"product-item-wrapper product-proto-animation"}/>
    })}
  </div>;
};