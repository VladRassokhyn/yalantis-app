import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main";
import { store } from "./lib/store";

const AppContext = React.createContext(store)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext.Provider value={store}>
        <Main/>
      </AppContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
