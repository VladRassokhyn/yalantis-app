import React from 'react';
import { Switch } from 'react-router-dom';
import { Routes, routes } from '../lib/router/routes';
import { Header } from '../components/Header';
import { Notificator } from '../components/Notificator';

export const Main = () => {
  return (
    <div>
      <Header />
      <Notificator />
      <Switch>
        {routes.map((route, i) => (
          <Routes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};
