import axios from 'axios';
const service = axios.create({
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	baseURL: 'http://localhost:3100',
	withCredentials: true
});

export const Exercises = {
	getExercises(page) {
		return service.get("/exercises", { params: { page: page } })
	}
};
