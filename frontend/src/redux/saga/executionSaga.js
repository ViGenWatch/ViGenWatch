import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions } from '../reducer/executionReducer';
import { getListExecutions } from '../../service/execution';

function* fetchListExecutions(action) {
  try {
    const apiResponse = yield call(getListExecutions, action.payload);
    if (apiResponse.status === 200) {
      const executions = [];
      Object.entries(apiResponse.data).forEach(([, execution]) => {
        executions.push({
          executionName: execution.executionName,
          executionId: execution.id,
          executionNumber: execution.executionNumber
        });
      });
      yield put(Actions.getExecutionsSuccess(executions));
    } else {
      yield put(Actions.getExecutionsFailure({ error: apiResponse.message }));
    }
  } catch (error) {
    yield put(Actions.getExecutionsFailure({ error: error.message || 'An error occurred' }));
  }
}

export function* executionSagas() {
  yield takeLatest(Actions.getExecutionsRequest.type, fetchListExecutions);
}
