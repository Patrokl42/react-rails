import request from '../request';
import { objectToFormData } from '../../helpers/functions';

export const Auth = {
	registerWithEmail(userData) {
		return request.postFormData('client/register', objectToFormData(userData));
	},
	registerWithFacebook(access_token, email, zip) {
		return request.post('client/register/facebook', { access_token, email, zip });
	},
	registerWithGoogle(access_token) {
		return request.post('client/register/google', { access_token });
	},
	registerWithTwitter(access_token, secret_token, email, zip) {
		return request.post('client/register/twitter', { access_token, secret_token, email, zip });
	},
	registerWithApple(access_token) {
		return request.post('client/register/apple', { access_token });
	},
	login(data) {
		return request.post('oauth/token', data, false);
	},
	resetPassword(email) {
		return request.post('client/password/reset', email);
	},
	recoveryPassword(data) {
		return request.post('client/password/recover', data);
	},
	getUserEmailFromTwitter(access_token, secret_token) {
		return request.get('client/twitter/user', { access_token, secret_token });
	}
};
