import {
  SIGNIN_USER_REQUEST_FAILURE,
  SIGNIN_USER_REQUEST_SUCCESS,
} from './actions';
function signinActionSuccess(user) {
  return {
    type: SIGNIN_USER_REQUEST_SUCCESS,
    payload: user,
  };
}
function signinActionError(error) {
  return {
    type: SIGNIN_USER_REQUEST_FAILURE,
    err: error,
    payload: error,
  };
}

export {signinActionError, signinActionSuccess};
