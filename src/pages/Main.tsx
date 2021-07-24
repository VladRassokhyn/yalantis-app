import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Routes, routes } from '../lib/router/routes';
import { Header } from '../components/Header';
import { Notificator } from '../components/Notificator';
import { ROUTE_PATHS } from '../lib/router/paths';

export const Main = () => (
  <div>
    <Header />
    <Notificator />
    <Switch>
      {routes.map((route, i) => (
        <Routes key={i} {...route} />
      ))}
    </Switch>
    <Redirect to={ROUTE_PATHS.PRODUCTS.BASE()}/>
  </div>
);
