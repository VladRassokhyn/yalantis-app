import React from 'react';

export const ListPrototype = () => {
  return (
    <div className={'list-wrapper'}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((arrItem, i) => {
        return (
          <div
            key={i}
            className={'product-item-wrapper product-proto-animation'}
          />
        );
      })}
    </div>
  );
};
