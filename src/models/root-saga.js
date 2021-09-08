import {all, spawn} from 'redux-saga/effects';
import {handler as userSaga} from './user/sagas';
import {
  handlerGetFavorites as getFavoritesSaga,
  handlerAddToFavorites as addToFavoritesSaga,
  handlerRemoveFromFavorites as removeFromFavoritesSaga,
} from './favorites/sagas';
import {productsSaga} from './products/sagas';

function* rootSagas() {
  yield all([
    productsSaga(),
    userSaga(),
    getFavoritesSaga(),
    addToFavoritesSaga(),
    removeFromFavoritesSaga(),
  ]);
}

export {rootSagas};
