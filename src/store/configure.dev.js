import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux'; // compose
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import { composeWithDevTools } from 'remote-redux-devtools';

import sagas from '../sagas';
import reducer from '../reducers';

export default (initialState = Map()) => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({ hostname: 'localhost', port: 8000 });

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
      autoRehydrate(),
    ),
  );

  sagaMiddleware.run(sagas);

  persistStore(store, { storage: AsyncStorage });

  return store;
};
