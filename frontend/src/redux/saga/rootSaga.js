import { all, fork } from 'redux-saga/effects';
import { authSagas } from './authSaga';
import { firstLoadDirTreeSagas } from './directoryTreeSaga';

const rootSaga = function* () {
  yield all([fork(authSagas), fork(firstLoadDirTreeSagas)]);
};

export default rootSaga;
