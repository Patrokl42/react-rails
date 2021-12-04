import axios from 'axios';
const service = axios.create({
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	withCredentials: true
});

export const Auth = {
	registrationWithEmail(user) {
		return service.post("http://localhost:3100/registrations", user)
	},
	loginWithEmail(user) {
		return service.post("http://localhost:3100/sessions", user)
	},
	checkLoginStatus() {
		return service.get("http://localhost:3100/logged_in")
	}
};
