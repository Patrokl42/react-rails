import {
  SET_USER,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  CLEAR_USER,
  CLEAR_USER_SUCCESS,
  CLEAR_USER_FAIL
} from './types';

const initialState = {
  user: {
    isLoading: true,
    user: {}
  }
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        isLoading: true
      }
    case SET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload
      }
    case SET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        serverErrors: payload.error.message
      }
    case CLEAR_USER:
      return {
        ...state,
        isLoading: true
      }
    case CLEAR_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {}
      }
    case CLEAR_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        serverErrors: payload.error.message
      }
    default:
      return state;
  }
};

export default userReducer;