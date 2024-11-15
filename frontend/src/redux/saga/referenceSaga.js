import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions } from '../reducer/referencesReducer';
import {
  getListReferens,
  getListReferensRoleAuthority,
  updateReferenceService,
  updateReferenceServiceRoleAuthority
} from '../../service/reference';

//role user 0x01
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

function* updateReferenceSaga(action) {
  try {
    const response = yield call(updateReferenceService, action.payload);
    if (response.status == 200) {
      yield put(Actions.updateRequireStatusSuccess(action.payload));
    } else {
      yield put(Actions.getReferencesFailure(response.message));
    }
  } catch (error) {
    yield put(Actions.getReferencesFailure({ error: error.message }));
  }
}

//role user 0x02

function* updateReferenceRoleAuthoritySaga(action) {
  try {
    const response = yield call(updateReferenceServiceRoleAuthority, action.payload);
    if (response.status == 200) {
      yield put(Actions.updateStatusRoleAuthoritySuccess(action.payload));
    } else {
      yield put(Actions.getReferencesFailure(response.message));
    }
  } catch (error) {
    yield put(Actions.getReferencesFailure({ error: error.message }));
  }
}

function* getListReferencesRoleAuthoritySaga() {
  try {
    const response = yield call(getListReferensRoleAuthority);
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
  yield takeLatest(Actions.updateRequireStatusRequest.type, updateReferenceSaga);
  yield takeLatest(Actions.getReferencesRequestRoleAuthority.type, getListReferencesRoleAuthoritySaga);
  yield takeLatest(Actions.updateStatusRequestRoleAuthority.type, updateReferenceRoleAuthoritySaga);
}
