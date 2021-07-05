import React from 'react';
import ReactDOM from 'react-dom';
import './css/global.css';
import './css/products-list.css';
import './css/paginator.css';
import './css/product.css';
import './css/basket.css';
import './css/reset.css';
import './css/modal.css';
import './css/header.css';
import './css/notificator.css';
import './css/ranged-slider.css';
import './css/list-menu.css';
import './css/buttons.css';
import './css/pages-proto.css';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './pages/Main';
import { Provider } from 'react-redux';
import { store } from './lib/store/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Main />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
