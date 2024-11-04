import { all, fork } from 'redux-saga/effects';
import { authSagas } from './authSaga';
import { firstLoadDirTreeSagas } from './directoryTreeSaga';
import { referenceSagas } from './referenceSaga';
import { executionSagas } from './executionSaga';

const rootSaga = function* () {
  yield all([fork(authSagas), fork(firstLoadDirTreeSagas), fork(referenceSagas), fork(executionSagas)]);
};

export default rootSaga;
