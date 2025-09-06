import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_HOME_DATA_REQUEST
} from './actionTypes';
import {
  fetchHomeDataSuccess,
  fetchHomeDataFailure
} from './actions';
import { getHomeDetails } from '@/api/HomeApi/homeApi';


// Worker Saga
function* fetchHomeDataSaga(action) {
  try {
    const response = yield call(getHomeDetails, action.payload);
    console.log(response.data);
    yield put(fetchHomeDataSuccess(response.data));
  } catch (error) {
    yield put(fetchHomeDataFailure(error.message || 'Something went wrong'));
  }
}

// Watcher Saga
export default function* homeSaga() {
  yield takeLatest(FETCH_HOME_DATA_REQUEST, fetchHomeDataSaga);
}
