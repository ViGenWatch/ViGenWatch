import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions } from '../reducer/referencesReducer';
import { getListReferens } from '../../service/reference';
function* getListReferencesSaga() {
  try {
    const response = yield call(getListReferens);
    if (response.status == 200) {
      yield put(Actions.getReferencesSuccess(response.data));
    } else {
      yield put(Actions.getReferencesFailure(response.message));
    }
  } catch (error) {
    yield put(Actions.getReferencesFailure({ error: error.message }));
  }
}

export function* referenceSagas() {
  yield takeLatest(Actions.getReferencesRequest.type, getListReferencesSaga);
}
