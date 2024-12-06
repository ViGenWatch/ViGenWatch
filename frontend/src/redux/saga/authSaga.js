const { signInService, getUserAccount, updateInforUser } = require('../../service/auth');
import { Actions } from '../reducer/authReducer';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

function* signInSaga(action) {
  try {
    yield delay(1000);
    const response = yield call(signInService, action.payload);
    console.log(response);
    if (response.status == 200) {
      yield put(Actions.signInSuccess(response.data));
    } else {
      yield put(Actions.signInFailure({ error: response.message || 'Vui lòng kiểm tra lại email và mật khẩu' }));
    }
  } catch (error) {
    yield put(Actions.signInFailure({ error: error.message || 'Vui lòng kiểm tra lại email và mật khẩu' }));
  }
}

function* getAccountSaga(action) {
  try {
    yield delay(1000);
    const response = yield call(getUserAccount, action.payload);
    if (response.status == 200) {
      yield put(Actions.signInSuccess(response.data));
    } else {
      yield put(Actions.signInFailure({ error: response.message }));
    }
  } catch (error) {
    yield put(Actions.signInFailure({ error: error.message }));
  }
}

function* updateInforSaga(action) {
  try {
    yield delay(1000);
    const response = yield call(updateInforUser, action.payload);
    if (response.status == 200) {
      yield put(Actions.updateInforSuccess(response.data));
    } else {
      yield put(Actions.updateInforFailure({ error: response.message }));
    }
  } catch (error) {
    yield put(Actions.updateInforFailure({ error: error.message }));
  }
}

export function* authSagas() {
  yield takeLatest(Actions.signInRequest.type, signInSaga);
  yield takeLatest(Actions.getAccountRequest.type, getAccountSaga);
  yield takeLatest(Actions.updateInforRequest.type, updateInforSaga);
}
