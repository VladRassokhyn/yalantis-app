import React, { ReactNode } from 'react';
import { ProductsReducer, productState } from './Products';
import { NotificationReducer, notifiState } from './Notificator';
import { TAppContext } from '../types';

const AppContext = React.createContext<TAppContext>({} as TAppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ProductsState, ProductsDispatch] = React.useReducer(
    ProductsReducer,
    productState
  );
  const [NotifiState, NotifiDispatch] = React.useReducer(
    NotificationReducer,
    notifiState
  );

  const store = {
    state: {
      ProductsState,
      NotifiState,
    },
    dispatch: {
      ProductsDispatch,
      NotifiDispatch,
    },
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const { state, dispatch } = React.useContext(AppContext);
  return { state, dispatch };
};
