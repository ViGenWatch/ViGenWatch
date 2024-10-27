import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer/rootReducer';
import rootSaga from './saga/rootSaga';
import { enableMapSet, setAutoFreeze } from 'immer';

enableMapSet();
setAutoFreeze(false);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducer/rootReducer', () => {
    const nextRootReducer = require('./reducer/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
