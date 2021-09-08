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
  ADD_TO_FAVORITE_NEWS_REQUEST,
  GET_FAVORITE_NEWS_REQUEST,
  REMOVE_FROM_FAVORITE_NEWS_REQUEST,
} from './actions';

function* handlerGetFavorites() {
  yield takeEvery(GET_FAVORITE_NEWS_REQUEST, getFavoritesNews);
}

function* handlerAddToFavorites() {
  yield takeEvery(ADD_TO_FAVORITE_NEWS_REQUEST, addToFavoritesNews);
}
function* handlerRemoveFromFavorites() {
  yield takeEvery(REMOVE_FROM_FAVORITE_NEWS_REQUEST, removeFromFavoritesNews);
}

function* getFavoritesNews() {
  try {
    //TODO get favorites from firestore database
    const favorites = [];

    yield put(getFavoritesActionSuccess(favorites));
  } catch (error) {
    yield put(getFavoritesActionError(error));
  }
}
function* addToFavoritesNews(favirte) {
  try {
    yield put(setToFavoritesActionSuccess(favirte));
  } catch (error) {
    yield put(setToFavoritesActionError(error));
  }
}

function* removeFromFavoritesNews(favirte) {
  try {
    yield put(removeFromFavoritesActionSuccess(favirte));
  } catch (error) {
    yield put(removeFromFavoritesActionError(error));
  }
}

export {handlerGetFavorites, handlerAddToFavorites, handlerRemoveFromFavorites};
