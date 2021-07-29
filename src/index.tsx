import React from 'react';
import ReactDOM from 'react-dom';
import './css/global.css';
import './css/reset.css';
import './css/modal.css';
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
