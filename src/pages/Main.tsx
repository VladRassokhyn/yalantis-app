import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { Routes, routes } from "../lib/store/routes";
import { Header } from "./Header";

export const Main = () => {
  return <div>
    <Redirect to={'/products'}/>
    <Header/>
    <Switch>
      {routes.map((route, i) => (
        <Routes key={i} {...route} />
      ))}
    </Switch>
  </div>
}