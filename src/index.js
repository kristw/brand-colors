import './index.css';

import App from './container';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
