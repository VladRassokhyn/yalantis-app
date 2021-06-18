import React from "react";
import { Switch } from "react-router-dom";
import { Routes, routes } from "../lib/store/routes";
import { Header } from "../components/Header";
import { useNotifiState } from "../lib/store/hooks";
import { Notification } from "../common/Notification";

export const Main = () => {

  const notification = useNotifiState();

  return <div>
    <Header/>
    {notification.addProduct && <Notification />}
    <Switch>
      {routes.map((route, i) => (
        <Routes key={i} {...route} />
      ))}
    </Switch>
  </div>
}