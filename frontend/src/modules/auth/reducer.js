import {
	REGISTER_WITH_EMAIL,
	REGISTER_WITH_EMAIL_SUCCESS,
	REGISTER_WITH_EMAIL_FAIL,
	LOGIN_WITH_EMAIL,
	LOGIN_WITH_EMAIL_SUCCESS,
	LOGIN_WITH_EMAIL_FAIL
} from './types';

const initialState = {
	isAuthenticated: !!localStorage.getItem('access_token'),
	loading: false,
	accessToken: localStorage.getItem('access_token'),
	id: null,
	serverErrors: null
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
				isAuthenticated: true,
				email: payload.email,
				id: payload.id,
				accessToken: payload.password_digest
			}
		case REGISTER_WITH_EMAIL_FAIL:
			return {
				...state,
				isAuthenticated: false,
				serverErrors: payload.error.message
			}
		default:
			return state;
	}
};

export default authReducer;
