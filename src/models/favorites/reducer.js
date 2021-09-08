import {
  GET_FAVORITE_NEWS_REQUEST_SUCCESS,
  GET_FAVORITE_NEWS_REQUEST_FAILURE,
  ADD_TO_FAVORITE_NEWS_REQUEST_SUCCESS,
  ADD_TO_FAVORITE_NEWS_REQUEST_FAILURE,
  REMOVE_FROM_FAVORITE_NEWS_REQUEST_SUCCESS,
  REMOVE_FROM_FAVORITE_NEWS_REQUEST_FAILURE,
} from './actions';
const initialState = {
  news: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE_NEWS_REQUEST_SUCCESS: {
      const news = action.payload;
      console.log('favoritesreducer', news);
      if (news && news.length > 0) {
        state.news = news;
      }
      return {...state, news: [...state.news]};
    }
    case GET_FAVORITE_NEWS_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }
    case ADD_TO_FAVORITE_NEWS_REQUEST_SUCCESS: {
      const newsItem = action.payload.payload;
      return {
        ...state,
        news: [...state.news, newsItem],
      };
    }

    case ADD_TO_FAVORITE_NEWS_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }

    case REMOVE_FROM_FAVORITE_NEWS_REQUEST_SUCCESS: {
      const newsItem = action.payload.payload;
      const filteredList = state.news.filter(
        item => item.title != newsItem.title,
      );
      state.news = filteredList;
      return {
        ...state,
        news: [...state.news],
      };
    }

    case REMOVE_FROM_FAVORITE_NEWS_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }

    default:
      return state;
  }
};

export {reducer};
