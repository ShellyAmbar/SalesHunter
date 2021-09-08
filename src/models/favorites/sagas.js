import {put, takeEvery} from 'redux-saga/effects';
import {
  getFavoritesActionError,
  getFavoritesActionSuccess,
  removeFromFavoritesActionError,
  removeFromFavoritesActionSuccess,
  setToFavoritesActionError,
  setToFavoritesActionSuccess,
} from './actionFunctions';
import {
  ADD_TO_FAVORITE_REQUEST,
  GET_FAVORITE_REQUEST,
  REMOVE_FROM_FAVORITE_REQUEST,
} from './actions';

function* handlerGetFavorites() {
  yield takeEvery(GET_FAVORITE_REQUEST, getFavorites);
}

function* handlerAddToFavorites() {
  yield takeEvery(ADD_TO_FAVORITE_REQUEST, addToFavorites);
}
function* handlerRemoveFromFavorites() {
  yield takeEvery(REMOVE_FROM_FAVORITE_REQUEST, removeFromFavorites);
}

function* getFavorites() {
  try {
    //TODO get favorites from firestore database
    const favorites = [];

    yield put(getFavoritesActionSuccess(favorites));
  } catch (error) {
    yield put(getFavoritesActionError(error));
  }
}
function* addToFavorites(favirte) {
  try {
    yield put(setToFavoritesActionSuccess(favirte));
  } catch (error) {
    yield put(setToFavoritesActionError(error));
  }
}

function* removeFromFavorites(favorite) {
  try {
    yield put(removeFromFavoritesActionSuccess(favorite));
  } catch (error) {
    yield put(removeFromFavoritesActionError(error));
  }
}

export {handlerGetFavorites, handlerAddToFavorites, handlerRemoveFromFavorites};
