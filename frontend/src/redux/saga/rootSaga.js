import { all, fork } from 'redux-saga/effects';
import { authSagas } from './authSaga';

const rootSaga = function* () {
  yield all([fork(authSagas)]);
};

export default rootSaga;
