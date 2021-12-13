import {
	GET_EXERCISES,
	GET_EXERCISES_SUCCESS,
	GET_EXERCISES_FAIL,
	CLEAR_EXERCISES
} from './types';

const initialState = {
	exercises: [],
	loading: true,
	serverErrors: null,
	pagination: {}
};

const exercisesReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_EXERCISES:
			return {
				...state
			}
		case GET_EXERCISES_SUCCESS:
			return {
				...state,
				loading: false,
				exercises: [...state.exercises, ...payload.exercises],
				pagination: payload.pagination
			}
		case GET_EXERCISES_FAIL:
			return {
				...state,
				loading: false,
				serverErrors: payload.error.message
			}
		case CLEAR_EXERCISES:
			return {
				...initialState,
			}
		default:
			return state;
	}
};

export default exercisesReducer;
