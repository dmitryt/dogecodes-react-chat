import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import './index.css';

const rootEl = document.getElementById('root');
const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootEl,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

registerServiceWorker();
