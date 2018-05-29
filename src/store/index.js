import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware as createRouterMiddleware, syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const browserHistory  = createBrowserHistory();

function configureStore() {
  const sagaMiddleware = createSagaMiddleware(rootSaga);
  const routerMiddleware = createRouterMiddleware(browserHistory);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware, sagaMiddleware, logger)
  );
  const store = createStore(rootReducer, enhancer);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();
export const history = syncHistoryWithStore(browserHistory, store);
