import {
  GET_FAVORITE_REQUEST_SUCCESS,
  GET_FAVORITE_REQUEST_FAILURE,
  ADD_TO_FAVORITE_REQUEST_SUCCESS,
  ADD_TO_FAVORITE_REQUEST_FAILURE,
  REMOVE_FROM_FAVORITE_REQUEST_SUCCESS,
  REMOVE_FROM_FAVORITE_REQUEST_FAILURE,
} from './actions';
const initialState = {
  favorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE_REQUEST_SUCCESS: {
      const favorites = action.payload;

      if (favorites && favorites.length > 0) {
        state.favorites = favorites;
      }
      return {...state, favorites: [...state.favorites]};
    }
    case GET_FAVORITE_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }
    case ADD_TO_FAVORITE_REQUEST_SUCCESS: {
      const favoritesItem = action.payload.payload;
      return {
        ...state,
        favorites: [...state.favorites, favoritesItem],
      };
    }

    case ADD_TO_FAVORITE_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }

    case REMOVE_FROM_FAVORITE_REQUEST_SUCCESS: {
      const favoritesItem = action.payload.payload;
      const filteredList = state.favorites.filter(
        item => item.title != favoritesItem.title,
      );
      state.favorites = filteredList;
      return {
        ...state,
        favorites: [...state.favorites],
      };
    }

    case REMOVE_FROM_FAVORITE_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }

    default:
      return state;
  }
};

export {reducer};
