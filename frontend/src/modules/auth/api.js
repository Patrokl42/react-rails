import axios from 'axios';
const service = axios.create({
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	baseURL: 'http://localhost:3100',
	withCredentials: true
});

export const Auth = {
	registrationWithEmail(user) {
		return service.post("/registrations", user)
	},
	loginWithEmail(user) {
		return service.post("/sessions", user)
	},
	checkLoginStatus() {
		return service.get("/logged_in")
	}
};
