import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware(rootSaga);
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  
  return store;
}
