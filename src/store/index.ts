import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-starter-kit';
import {MetricsSaga} from './sagas';
import reducers from './reducers';
import { all } from 'redux-saga/effects';

const reducer = combineReducers(reducers);
export type IState = ReturnType<typeof reducer>;

function* rootSaga() {
  yield all([...MetricsSaga]);
}

export default () => {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(reducer, composeEnhancers(middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};
