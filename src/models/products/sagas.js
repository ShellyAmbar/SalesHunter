import {put, takeEvery, call} from 'redux-saga/effects';
import {GET_PRODUCTS_REQUEST} from './actions';
import {productsActionError, productsActionSuccess} from './actionsFunctions';
import {getProductsCall} from './calls';

function* productsSaga() {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProducts);
}

function* getProducts() {
  try {
    let list = [];
    const response = yield call(getProductsCall);
    response.docs.map(product => list.push(product.data()));
    // console.log('list', list);
    yield put(productsActionSuccess(list));
  } catch (error) {
    yield put(productsActionError(error));
  }
}

export {productsSaga};
