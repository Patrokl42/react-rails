import { Exercises } from './api';
import {
	GET_EXERCISES,
	GET_EXERCISES_SUCCESS,
	GET_EXERCISES_FAIL,
	CLEAR_EXERCISES
} from './types';

const getExercisesSuccess = ({ exercises, pagination }) => async dispatch => {
	console.log(exercises);
	dispatch({
		type: GET_EXERCISES_SUCCESS,
		payload: {
			exercises,
			pagination
		}
	});
}

const getExercisesFail = (error) => async dispatch => {
	dispatch({
		type: GET_EXERCISES_FAIL
	});

	throw error;
}

export const getExercises = (page) => async dispatch => {
	dispatch({ type: GET_EXERCISES });

	try {
		const res = await Exercises.getExercises(page)
		dispatch(getExercisesSuccess(res.data));
	} catch (error) {
		dispatch(getExercisesFail(error));
	}
};

export const clearExercises = () => async dispatch => {
	dispatch({ type: CLEAR_EXERCISES });
};