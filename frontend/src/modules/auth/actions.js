import { values } from 'lodash';
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

const registerWithEmailSuccess = (userCredentials, onSuccess) => async dispatch => {
	const res = await Auth.registrationWithEmail(userCredentials)

	dispatch({
		type: REGISTER_WITH_EMAIL_SUCCESS,
		payload: res.data.user
	});

	onSuccess();
	return res;
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

	dispatch({
		type: REGISTER_WITH_EMAIL
	});

	try {
		registerWithEmailSuccess(userCredentials, onSuccess);
	} catch (error) {
		registerWithEmailFail(error);
	}
};

export const checkLoginStatus = () => async dispatch => {
	const res = await Auth.checkLoginStatus()
	console.log(res);
}

const loginWithEmailSuccess = (userCredentials, onSuccess) => async dispatch => {
	console.log(322);
	const res = await Auth.loginWithEmail(userCredentials)
	console.log(res);

	dispatch({
		type: LOGIN_WITH_EMAIL_SUCCESS,
		payload: res.data.user
	});

	// onSuccess();
	// return res;
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

	dispatch({
		type: LOGIN_WITH_EMAIL
	});

	try {
		console.log(userCredentials);
		const res = await Auth.loginWithEmail(userCredentials)
		console.log(res);
		loginWithEmailSuccess(userCredentials, onSuccess);
	} catch (error) {
		loginWithEmailFail(error);
	}
};