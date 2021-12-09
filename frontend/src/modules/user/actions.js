import {
  SET_USER,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  CLEAR_USER,
  CLEAR_USER_SUCCESS,
  CLEAR_USER_FAIL
} from './types';

const setUserSuccess = (user) => async dispatch => {
  dispatch({
    type: SET_USER_SUCCESS,
    payload: user
  });
}

const setUserFail = (error) => async dispatch => {
  dispatch({
    type: SET_USER_FAIL,
    payload: error.response.data
  });
  throw error;
}

export const setUser = (user) => async dispatch => {
  dispatch({ type: SET_USER });

  try {
    dispatch(setUserSuccess(user));
  } catch (error) {
    dispatch(setUserFail(error));
  }
};

const clearUserSuccess = () => async dispatch => {
  dispatch({
    type: CLEAR_USER_SUCCESS
  });
}

const clearUserFail = (error) => async dispatch => {
  dispatch({
    type: CLEAR_USER_FAIL
  });
  throw error;
}

export const clearUser = () => async dispatch => {
  dispatch({ type: CLEAR_USER });

  try {
    dispatch(clearUserSuccess());
  } catch (error) {
    dispatch(clearUserFail(error));
  }
};