import React from 'react';
import { EntityId } from '@reduxjs/toolkit';

type TProps = {
  listArray: EntityId[];
  ItemComponent: React.FC<{itemId: EntityId}>;
};

export const List: React.FC<TProps> = ({ listArray, ItemComponent }) => {
  return (
    <div className={'list-wrapper'}>
      {listArray.map((itemId) => {
        return <ItemComponent key={itemId} itemId={itemId} />;
      })}
    </div>
  );
};
