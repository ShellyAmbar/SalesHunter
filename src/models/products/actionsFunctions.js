import {
  GET_PRODUCTS_REQUEST_FAILURE,
  GET_PRODUCTS_REQUEST_SUCCESS,
} from './actions';
function productsActionSuccess(payload) {
  return {
    type: GET_PRODUCTS_REQUEST_SUCCESS,
    payload: payload,
  };
}
function productsActionError(error) {
  return {
    type: GET_PRODUCTS_REQUEST_FAILURE,
    err: error,
    payload: error,
  };
}

export {productsActionError, productsActionSuccess};
