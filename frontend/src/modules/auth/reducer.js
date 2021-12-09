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
	loading: false,
	serverErrors: null,
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_WITH_EMAIL:
			return {
				...state,
				isLoading: true
			}
		case REGISTER_WITH_EMAIL_SUCCESS:
			return {
				...state,
				isAuthenticated: true
			}
		case REGISTER_WITH_EMAIL_FAIL:
			return {
				...state,
				isAuthenticated: false,
				serverErrors: payload.error.message
			}
		case LOGIN_WITH_EMAIL:
			return {
				...state,
				isLoading: true
			}
		case LOGIN_WITH_EMAIL_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false
			}
		case LOGIN_WITH_EMAIL_FAIL:
			return {
				...state,
				isAuthenticated: false,
				serverErrors: payload.error.message,
				isLoading: false
			}
		case CHECK_LOGIN_STATUS:
			return {
				...state,
				isLoading: true
			}
		case CHECK_LOGIN_STATUS_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false
			}
		case CHECK_LOGIN_STATUS_FAIL:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false
			}
		default:
			return state;
	}
};

export default authReducer;
