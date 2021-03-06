import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'sanitize.css/sanitize.css';
import 'url-search-params-polyfill';

import store, { history } from './modules/redux/store';
import App from './containers/App';
import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <App />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  target,
);
