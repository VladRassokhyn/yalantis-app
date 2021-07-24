import React from 'react';
import ReactDOM from 'react-dom';
import './css/global.css';
import './components/List/products-list.css';
import './common/Paginator/paginator.css';
import './components/Product/product.css';
import './components/List/basket-list.css';
import './css/reset.css';
import './css/modal.css';
import './components/Header/header.css';
import './components/Notificator/notificator.css';
import './common/SliderRange/ranged-slider.css';
import './components/NewProductForm/new-product-form.css';
import './components/ListMenu/list-menu.css';
import './components/Buttons/buttons.css';
import './common/PagesPrototypes/pages-proto.css';
import './components/Order/order.css';
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
