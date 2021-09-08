import {
  GET_PRODUCTS_REQUEST_FAILURE,
  GET_PRODUCTS_REQUEST_SUCCESS,
} from './actions';

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST_SUCCESS: {
      const products = action.payload;

      state.products = products;
      return {...state};
    }
    case GET_PRODUCTS_REQUEST_FAILURE: {
      const {err} = action.err;
      return state;
    }
    default:
      return state;
  }
};

export {reducer};
