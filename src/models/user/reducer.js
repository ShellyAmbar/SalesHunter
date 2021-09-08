import {
  SIGNIN_USER_REQUEST_SUCCESS,
  SIGNIN_USER_REQUEST_FAILURE,
} from './actions';
const initialState = {
  id: 'id1',
  token: 'token1',
  name: 'name1',
  email: 'email1',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER_REQUEST_SUCCESS: {
      const {id, token, name, email} = action.payload;
      return {id, token, name, email};
    }
    case SIGNIN_USER_REQUEST_FAILURE: {
      const {err} = action.err;
      return err;
    }
    default:
      return state;
  }
};

export {reducer};
