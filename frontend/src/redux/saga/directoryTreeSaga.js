import { getFirstLoadDirTreeService } from '../../service/directoryTree';
import { Actions } from '../reducer/directoryTreeReducer';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

function* getFirstLoadDirTreeSaga() {
  try {
    delay(1000);
    const response = yield call(getFirstLoadDirTreeService);
    if (response.status == 200) {
      yield put(Actions.getNodeDataSuccess(response.data));
    } else {
      yield put(Actions.getNodeDataFailure({ error: response.message }));
    }
  } catch (error) {
    yield put(Actions.getNodeDataFailure({ error: error.message }));
  }
}

export function* firstLoadDirTreeSagas() {
  yield takeLatest(Actions.getNodeDataRequest.type, getFirstLoadDirTreeSaga);
}
