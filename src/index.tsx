import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
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
