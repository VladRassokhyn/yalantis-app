import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main";
import { AppProvider } from "./lib/store/context";
import { Provider } from "react-redux";
import store from "./lib/store/store";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppProvider>
          <Main/>
        </AppProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
