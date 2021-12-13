import { Auth } from './api';
import {
	REGISTER_WITH_EMAIL,
	REGISTER_WITH_EMAIL_SUCCESS,
	REGISTER_WITH_EMAIL_FAIL,
	LOGIN_WITH_EMAIL,
	LOGIN_WITH_EMAIL_SUCCESS,
	LOGIN_WITH_EMAIL_FAIL,
	CHECK_LOGIN_STATUS,
	CHECK_LOGIN_STATUS_SUCCESS,
	CHECK_LOGIN_STATUS_FAIL
} from './types';

import {
	setUser,
	clearUser
} from '../user/actions.js'

const registerWithEmailSuccess = (data, onSuccess) => async dispatch => {
	dispatch({
		type: REGISTER_WITH_EMAIL_SUCCESS,
		payload: data
	});

	dispatch(setUser(data.user));
	onSuccess();
}

const registerWithEmailFail = (error) => async dispatch => {
	dispatch({
		type: REGISTER_WITH_EMAIL_FAIL,
		payload: error.response.data
	});
	throw error;
}

export const registerWithEmail = (user, onSuccess) => async dispatch => {
	const userCredentials = { user: { email: user.email, password: user.password, password_confirmation: user.confirmPassword } }

	dispatch({ type: REGISTER_WITH_EMAIL });

	try {
		const res = await Auth.registrationWithEmail(userCredentials)
		dispatch(registerWithEmailSuccess(res.data, onSuccess));
	} catch (error) {
		dispatch(registerWithEmailFail(error));
	}
};

const loginWithEmailSuccess = (data, onSuccess) => async dispatch => {
	dispatch({
		type: LOGIN_WITH_EMAIL_SUCCESS,
		payload: data.user
	});

	dispatch(setUser(data.user));
	onSuccess();
}

const loginWithEmailFail = (error) => async dispatch => {
	dispatch({
		type: LOGIN_WITH_EMAIL_FAIL,
		payload: error.response.data
	});
	throw error;
}

export const loginWithEmail = (user, onSuccess) => async dispatch => {
	const userCredentials = { user: { email: user.email, password: user.password } }

	dispatch({ type: LOGIN_WITH_EMAIL });

	try {
		const res = await Auth.loginWithEmail(userCredentials)
		dispatch(loginWithEmailSuccess(res.data, onSuccess));
	} catch (error) {
		dispatch(loginWithEmailFail(error));
	}
};

const checkLoginStatusSuccess = (data, onSuccess) => async dispatch => {
	dispatch({
		type: CHECK_LOGIN_STATUS_SUCCESS,
		payload: data.user
	});

	dispatch(setUser(data.user));
	onSuccess();
}

const checkLoginStatusFail = (error) => async dispatch => {
	console.log(error);
	dispatch({
		type: CHECK_LOGIN_STATUS_FAIL
	});
	throw error;
}


export const checkLoginStatus = (onSuccess = () => { }) => async dispatch => {
	dispatch({ type: CHECK_LOGIN_STATUS });

	try {
		const res = await Auth.checkLoginStatus();
		dispatch(checkLoginStatusSuccess(res.data, onSuccess))
	} catch (error) {
		dispatch(checkLoginStatusFail(error));
	}
}