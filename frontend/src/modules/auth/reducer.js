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

const initialState = {
	isAuthenticated: !!localStorage.getItem('access_token'),
	loading: true,
	serverErrors: null,
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_WITH_EMAIL:
			return {
				...state,
				loading: false
			}
		case REGISTER_WITH_EMAIL_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false
			}
		case REGISTER_WITH_EMAIL_FAIL:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				serverErrors: payload.error.message
			}
		case LOGIN_WITH_EMAIL:
			return {
				...state,
				loading: true
			}
		case LOGIN_WITH_EMAIL_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false
			}
		case LOGIN_WITH_EMAIL_FAIL:
			return {
				...state,
				isAuthenticated: false,
				serverErrors: payload.error.message,
				loading: false
			}
		case CHECK_LOGIN_STATUS:
			return {
				...state,
				loading: true
			}
		case CHECK_LOGIN_STATUS_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false
			}
		case CHECK_LOGIN_STATUS_FAIL:
			return {
				...state,
				isAuthenticated: false,
				loading: false
			}
		default:
			return state;
	}
};

export default authReducer;
