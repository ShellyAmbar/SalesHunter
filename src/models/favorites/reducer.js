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
      try {
        console.log('state.favorites', state.favorites);
        let filteredList = state.favorites.filter(item => {
          console.log('item', item);
          if (item) {
            return favoritesItem.id !== item.id;
          } else return false;
        });

        state.favorites = filteredList;
      } catch (err) {
        console.log('err', err);
      }

      return {...state, favorites: [...state.favorites]};
    }

    case REMOVE_FROM_FAVORITE_REQUEST_FAILURE: {
      const {err} = action.err;
      return state;
    }

    default:
      console.log('error');
      return state;
  }
};

export {reducer};
