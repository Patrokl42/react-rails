import axios from 'axios';

export const Auth = {
	registrationWithEmail(user) {
		return axios.post("http://localhost:3100/registrations", user, { withCredentials: true })
	},
	loginWithEmail(user) {
		return axios.post("http://localhost:3100/sessions", user, { withCredentials: true })
	},
	checkLoginStatus() {
		return axios.get("http://localhost:3100/logged_in", { withCredentials: true })
	}
};
