import {put, takeEvery} from 'redux-saga/effects';
import {signinActionError, signinActionSuccess} from './actionFunctions';
import {SIGNIN_USER_REQUEST} from './actions';

function* handler() {
  yield takeEvery(SIGNIN_USER_REQUEST, getAllUserInfo);
}

function* getAllUserInfo(action) {
  console.log(action);

  try {
    //if success
    const user = {};
    yield put(signinActionSuccess(user));
  } catch (error) {
    yield put(signinActionError(error));
  }
}

export {handler};
