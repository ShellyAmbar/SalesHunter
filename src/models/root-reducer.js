import {reducer as favoritesReducer} from './favorites/reducer';
import {reducer as productsReducer} from './products/reducer';
import {reducer as userReducer} from './user/reducer';
import {combineReducers} from 'redux';

const reducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  favorites: favoritesReducer,
});

export {reducer};
