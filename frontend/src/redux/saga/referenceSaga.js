import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions } from '../reducer/referencesReducer';
import { getListReferens } from '../../service/reference';
function* getListReferencesSaga(action) {
  try {
    const response = yield call(getListReferens, action.payload);
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
