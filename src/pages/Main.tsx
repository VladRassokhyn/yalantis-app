import React from "react";
import { Switch } from "react-router-dom";
import { Routes, routes } from "../lib/store/routes";
import { Header } from "../components/Header";

export const Main = () => {
  return <div>
    <Header/>
    <Switch>
      {routes.map((route, i) => (
        <Routes key={i} {...route} />
      ))}
    </Switch>
  </div>
}