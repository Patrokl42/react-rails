import {
	LOGIN_WITH_EMAIL_SUCCESS,
} from './types';

const initialState = {
	isAuthenticated: !!localStorage.getItem('access_token'),
	loading: true,
	accessToken: localStorage.getItem('access_token'),
	userId: null
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_WITH_EMAIL_SUCCESS:
			localStorage.setItem('access_token', payload);
			return {
				...state,
				accessToken: payload,
				isAuthenticated: true,
				loading: false
			};
		default:
			return state;
	}
};

export default authReducer;
