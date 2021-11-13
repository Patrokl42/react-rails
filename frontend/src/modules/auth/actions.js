import { get, values, isEmpty } from 'lodash';
import { Auth } from './api';
import {
	REGISTER_WITH_EMAIL_SUCCESS,
	REGISTER_WITH_EMAIL_FAIL,
	PASSWORD_RECOVERY_SUCCESS,
	PASSWORD_RECOVERY_FAIL,
	REGISTER_WITH_TWITTER_SUCCESS,
	REGISTER_WITH_TWITTER_FAIL,
	REGISTER_WITH_FACEBOOK_SUCCESS,
	REGISTER_WITH_FACEBOOK_FAIL,
	REGISTER_WITH_GOOGLE_SUCCESS,
	REGISTER_WITH_GOOGLE_FAIL,
	LOGIN_WITH_TWITTER_SUCCESS,
	LOGIN_WITH_TWITTER_FAIL,
	LOGIN_WITH_GOOGLE_SUCCESS,
	LOGIN_WITH_GOOGLE_FAIL,
	LOGIN_WITH_FACEBOOK_SUCCESS,
	LOGIN_WITH_FACEBOOK_FAIL,
	LOGIN_WITH_EMAIL_SUCCESS,
	LOGIN_WITH_EMAIL_FAIL,
	LOGIN_WITH_APPLE_SUCCESS,
	LOGIN_WITH_APPLE_FAIL
} from './types';
import { getPathByName } from '../../routes/functions';
import { getUserInfo } from '../user/userProfile/actions';
import { getToggleLoadingAction } from '../common/actions';
import { authErrorHandler } from './functions';
import store from '../store';
import { getPositionMap } from '../common/api';
import { getLocationFromMapbox } from '../../helpers/functions';

export const registerWithEmailFailAction = (error, setError) => {
	setError({ serverError: values(values(error)[1])[0][0] });
	return {
		type: REGISTER_WITH_EMAIL_FAIL
	};
};

export const registerWithEmail = (
	data,
	history,
	setError,
	redirectToCreateBusiness
) => dispatch => {
	const { firstName: first_name, lastName: last_name, email, password, zip, logo } = data;
	const avatar = logo?.[0];

	dispatch(getToggleLoadingAction(true));

	return getPositionMap(zip, process.env.REACT_APP_MAPBOX_TOKEN)
		.then(response => {
			return response.json();
		})
		.then(places => {
			const address = getLocationFromMapbox(places);

			return Auth.registerWithEmail({
				first_name,
				last_name,
				email,
				password,
				zip,
				terms_accepted: true,
				avatar,
				full_address: address
			})
				.then(() => {
					dispatch(getToggleLoadingAction(false));
					dispatch(
						loginWithEmail({ email, password }, history, setError, redirectToCreateBusiness)
					);
				})
				.catch(e => {
					dispatch(getToggleLoadingAction(false));
					dispatch(registerWithEmailFailAction(e, setError));
					throw e;
				});
		})
		.catch(error => {
			throw error;
		});
};

export const passwordRecoverySuccessAction = () => {
	return {
		type: PASSWORD_RECOVERY_SUCCESS
	};
};

export const passwordRecoveryFailAction = () => {
	return {
		type: PASSWORD_RECOVERY_FAIL
	};
};

export const passwordRecovery = data => dispatch => {
	dispatch(passwordRecoverySuccessAction());
};

export const registerWithFacebookSuccessAction = (userId, history) => {
	history.push(getPathByName('businessesListing', {}));
	return {
		type: REGISTER_WITH_FACEBOOK_SUCCESS,
		payload: userId
	};
};

export const registerWithFacebookFailAction = () => {
	return {
		type: REGISTER_WITH_FACEBOOK_FAIL
	};
};

export const registerWithFacebook = (
	data,
	history,
	setError,
	openModal,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const { accessToken } = data;
	const email = get(data, 'email', undefined);

	dispatch(getToggleLoadingAction(true));

	return Auth.login({
		access_token: accessToken,
		grant_type: 'facebook_grant',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		provider: 'users'
	})
		.then(result => {
			dispatch(getToggleLoadingAction(false));
			const res = get(result, 'access_token', null);
			dispatch(
				loginWithFacebookSuccessAction(res, history, redirectToCreateBusiness, setUserBanModal)
			);
		})
		.catch(() => {
			dispatch(getToggleLoadingAction(false));
			if (!email) {
				openModal(accessToken);
			} else {
				dispatch(getToggleLoadingAction(true));
				return Auth.registerWithFacebook(accessToken)
					.then(() => {
						dispatch(getToggleLoadingAction(false));
						dispatch(
							loginWithFacebook({ accessToken }, history, setError, redirectToCreateBusiness)
						);
					})
					.catch(e => {
						dispatch(getToggleLoadingAction(false));
						dispatch(registerWithFacebookFailAction());
						setError('name', { message: 'User already registered' });

						throw e;
					});
			}
		});
};

export const registerWithTwitterSuccessAction = (userId, history) => {
	history.push(getPathByName('businessesListing', {}));
	return {
		type: REGISTER_WITH_TWITTER_SUCCESS,
		payload: userId
	};
};

export const registerWithTwitterFailAction = () => {
	return {
		type: REGISTER_WITH_TWITTER_FAIL
	};
};

export const registerWithTwitter = (
	data,
	history,
	setError,
	openModal,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const oauth_token = get(data, 'oauth_token', undefined);
	const oauth_token_secret = get(data, 'oauth_token_secret', undefined);

	dispatch(getToggleLoadingAction(true));

	return Auth.login({
		access_token: oauth_token,
		secret_token: oauth_token_secret,
		grant_type: 'twitter_grant',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		provider: 'users'
	})
		.then(result => {
			dispatch(getToggleLoadingAction(false));
			const res = get(result, 'access_token', null);
			dispatch(loginWithTwitterSuccessAction(res, history, redirectToCreateBusiness));
		})
		.catch(e => {
			if (e?.message === 'User is banned') {
				dispatch(loginWithTwitterFailAction(e, setError, setUserBanModal));
				dispatch(getToggleLoadingAction(false));
			} else {
				return Auth.getUserEmailFromTwitter(oauth_token, oauth_token_secret)
					.then(response => {
						dispatch(getToggleLoadingAction(false));
						const email = get(response, 'data.twitter_user.email', undefined);
						if (email) {
							dispatch(getToggleLoadingAction(true));
							return Auth.registerWithTwitter(oauth_token, oauth_token_secret)
								.then(() => {
									dispatch(getToggleLoadingAction(false));
									dispatch(
										loginWithTwitter(
											{ oauth_token, oauth_token_secret },
											history,
											setError,
											redirectToCreateBusiness
										)
									);
								})
								.catch(e => {
									dispatch(getToggleLoadingAction(false));
									dispatch(registerWithTwitterFailAction());
									setError('name', { message: 'User already registered' });

									throw e;
								});
						}
						openModal({ oauth_token, oauth_token_secret });
					})
					.catch(e => {
						dispatch(getToggleLoadingAction(false));
						dispatch(registerWithTwitterFailAction());
						setError('name', { message: 'User already registered' });
						throw e;
					});
			}
		});
};

export const registerWithGoogleSuccessAction = (userId, history) => {
	history.push(getPathByName('businessesListing', {}));
	return {
		type: REGISTER_WITH_GOOGLE_SUCCESS,
		payload: userId
	};
};

export const registerWithGoogleFailAction = () => {
	return {
		type: REGISTER_WITH_GOOGLE_FAIL
	};
};

export const registerWithGoogle = (
	data,
	history,
	setError,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const { accessToken } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.registerWithGoogle(accessToken)
		.then(() => {
			dispatch(
				loginWithGoogle(
					{ accessToken },
					history,
					setError,
					redirectToCreateBusiness,
					setUserBanModal
				)
			);
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			dispatch(registerWithGoogleFailAction());
			setError({ serverError: 'User not registered' });
			throw e;
		});
};

export const loginWithAppleSuccess = accessToken => {
	return {
		type: LOGIN_WITH_APPLE_SUCCESS,
		payload: accessToken
	};
};

export const loginWithApple = (accessTokenApple, redirectToCreateBusiness, history) => dispatch => {
	return Auth.login({
		access_token: accessTokenApple,
		grant_type: 'apple_grant',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		provider: 'users'
	})
		.then(response => {
			const accessToken = get(response, 'access_token', undefined);
			Promise.all([dispatch(loginWithAppleSuccess(accessToken)), dispatch(getUserInfo())])
				.then(() => {
					dispatch(getToggleLoadingAction(false));
					const userData = store.getState().user.userInfo;
					if (userData.first_name && userData.last_name) {
						history.push('/user/business-listing');
					} else {
						history.push(
							redirectToCreateBusiness
								? '/user/add-required-info/?forBusiness=true&appleRegister=true'
								: '/user/add-required-info/?appleRegister=true'
						);
					}
				})
				.catch(e => {
					dispatch(getToggleLoadingAction(false));
					throw e;
				});
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			throw e;
		});
};

export const registerWithApple = (data, history, redirectToCreateBusiness) => dispatch => {
	const { id_token: accessToken } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.registerWithApple(accessToken)
		.then(() => {
			dispatch(loginWithApple(accessToken, redirectToCreateBusiness, history));
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			throw e;
		});
};

export const loginWithTwitterSuccessAction = (
	data,
	history,
	redirectToCreateBusiness
) => dispatch => {
	Promise.all([
		dispatch({
			type: LOGIN_WITH_TWITTER_SUCCESS,
			payload: data
		}),
		dispatch(getUserInfo())
	]).then(() => {
		const userLocation = get(store.getState(), 'user.userInfo.locations', undefined);
		if (isEmpty(userLocation)) {
			history.push(
				redirectToCreateBusiness
					? '/user/add-required-info/?forBusiness=true'
					: '/user/add-required-info'
			);
		} else {
			history.push(
				getPathByName(
					redirectToCreateBusiness ? 'businessRegistrationStep1' : 'businessesListing',
					{}
				)
			);
		}
	});
};

export const loginWithTwitterFailAction = (error, setError, setUserBanModal) => {
	authErrorHandler(error, setError, setUserBanModal);
	return {
		type: LOGIN_WITH_TWITTER_FAIL
	};
};

export const loginWithTwitter = (
	data,
	history,
	setError,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const { oauth_token, oauth_token_secret } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.login({
		access_token: oauth_token,
		secret_token: oauth_token_secret,
		grant_type: 'twitter_grant',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		provider: 'users'
	})
		.then(result => {
			dispatch(getToggleLoadingAction(false));
			const res = get(result, 'access_token', null);
			dispatch(loginWithTwitterSuccessAction(res, history, redirectToCreateBusiness));
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			dispatch(loginWithTwitterFailAction(e, setError, setUserBanModal));
			throw e;
		});
};

export const loginWithFacebookSuccessAction = (
	data,
	history,
	redirectToCreateBusiness
) => dispatch => {
	Promise.all([
		dispatch({
			type: LOGIN_WITH_FACEBOOK_SUCCESS,
			payload: data
		}),
		dispatch(getUserInfo())
	]).then(() => {
		const userLocation = get(store.getState(), 'user.userInfo.locations', undefined);
		if (isEmpty(userLocation)) {
			history.push(
				redirectToCreateBusiness
					? '/user/add-required-info/?forBusiness=true'
					: '/user/add-required-info'
			);
		} else {
			history.push(
				getPathByName(
					redirectToCreateBusiness ? 'businessRegistrationStep1' : 'businessesListing',
					{}
				)
			);
		}
	});
};

export const loginWithFacebookFailAction = (error, setError, setUserBanModal) => {
	authErrorHandler(error, setError, setUserBanModal);
	return {
		type: LOGIN_WITH_FACEBOOK_FAIL
	};
};

export const loginWithFacebook = (
	data,
	history,
	setError,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const { accessToken: access_token } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.login({
		access_token,
		grant_type: 'facebook_grant',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		provider: 'users'
	})
		.then(result => {
			dispatch(getToggleLoadingAction(false));
			const res = get(result, 'access_token', null);
			dispatch(loginWithFacebookSuccessAction(res, history, redirectToCreateBusiness));
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			dispatch(loginWithFacebookFailAction(e, setError, setUserBanModal));
			throw e;
		});
};

export const loginWithGoogleSuccessAction = (
	data,
	history,
	redirectToCreateBusiness
) => dispatch => {
	Promise.all([
		dispatch({
			type: LOGIN_WITH_GOOGLE_SUCCESS,
			payload: data
		}),
		dispatch(getUserInfo())
	]).then(() => {
		const userLocation = get(store.getState(), 'user.userInfo.locations', undefined);
		if (isEmpty(userLocation)) {
			history.push(
				redirectToCreateBusiness
					? '/user/add-required-info/?forBusiness=true'
					: '/user/add-required-info'
			);
		} else {
			history.push(
				getPathByName(
					redirectToCreateBusiness ? 'businessRegistrationStep1' : 'businessesListing',
					{}
				)
			);
		}
	});
};

export const loginWithGoogleFailAction = (error, setError, setUserBanModal) => {
	authErrorHandler(error, setError, setUserBanModal);
	return {
		type: LOGIN_WITH_GOOGLE_FAIL
	};
};

export const loginWithGoogle = (
	data,
	history,
	setError,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const { accessToken: access_token } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.login({
		access_token,
		grant_type: 'google_grant',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		provider: 'users'
	})
		.then(result => {
			dispatch(getToggleLoadingAction(false));
			const res = get(result, 'access_token', null);
			dispatch(loginWithGoogleSuccessAction(res, history, redirectToCreateBusiness));
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			dispatch(loginWithGoogleFailAction(e, setError, setUserBanModal));
			throw e;
		});
};

export const loginWithEmailSuccessAction = (
	data,
	history,
	redirectToCreateBusiness
) => dispatch => {
	Promise.all([
		dispatch({
			type: LOGIN_WITH_EMAIL_SUCCESS,
			payload: data
		}),
		dispatch(getUserInfo())
	]).then(
		history.push(
			getPathByName(
				redirectToCreateBusiness ? 'businessRegistrationStep1' : 'businessesListing',
				{}
			)
		)
	);
};

export const loginWithEmailFailAction = (error, setError, setUserBanModal) => {
	authErrorHandler(error, setError, setUserBanModal);
	return {
		type: LOGIN_WITH_EMAIL_FAIL
	};
};

export const loginWithEmail = (
	data,
	history,
	setError,
	redirectToCreateBusiness,
	setUserBanModal
) => dispatch => {
	const { email: username, password } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.login({
		grant_type: 'password',
		client_id: process.env.REACT_APP_CLIENT_ID,
		client_secret: process.env.REACT_APP_CLIENT_SECRET,
		username,
		password,
		provider: 'users'
	})
		.then(result => {
			dispatch(getToggleLoadingAction(false));
			const res = get(result, 'access_token', null);
			dispatch(loginWithEmailSuccessAction(res, history, redirectToCreateBusiness));
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			dispatch(loginWithEmailFailAction(e, setError, setUserBanModal));
			throw e;
		});
};

export const resetPassword = (data, history, setError) => dispatch => {
	const { email } = data;
	dispatch(getToggleLoadingAction(true));

	return Auth.resetPassword({ email })
		.then(() => {
			dispatch(getToggleLoadingAction(false));
			history.push('/user/reset-password-success');
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			setError('email', { msg: e.message });
			throw e;
		});
};

export const recoveryPassword = (data, history, setError) => dispatch => {
	dispatch(getToggleLoadingAction(true));
	return Auth.recoveryPassword(data)
		.then(() => {
			dispatch(getToggleLoadingAction(false));
			history.push('/user/login');
		})
		.catch(e => {
			dispatch(getToggleLoadingAction(false));
			setError('error', { msg: e.message });
			throw e;
		});
};

export const registerWithFacebookWithoutEmail = (
	accessToken,
	email,
	zip,
	setError,
	setOpenModal,
	history,
	redirectToCreateBusiness
) => dispatch => {
	dispatch(getToggleLoadingAction(true));
	return Auth.registerWithFacebook(accessToken, email, zip)
		.then(() => {
			dispatch(getToggleLoadingAction(false));
			setOpenModal();
			dispatch(loginWithFacebook({ accessToken }, history, setError, redirectToCreateBusiness));
		})
		.catch(error => {
			dispatch(getToggleLoadingAction(false));
			dispatch(registerWithFacebookFailAction());
			const errorMessage = values(values(error)[1])[0][0];
			setError('serverError', { errorMessage });
			throw error;
		});
};

export const registerWithTwitterWithoutEmail = (
	accessToken,
	email,
	zip,
	setError,
	setOpenModal,
	history
) => dispatch => {
	const { oauth_token, oauth_token_secret } = accessToken;
	dispatch(getToggleLoadingAction(true));
	return Auth.registerWithTwitter(oauth_token, oauth_token_secret, email, zip)
		.then(() => {
			dispatch(getToggleLoadingAction(false));
			setOpenModal();
			dispatch(loginWithTwitter({ oauth_token, oauth_token_secret }, history, setError));
		})
		.catch(error => {
			dispatch(getToggleLoadingAction(false));
			dispatch(registerWithTwitterFailAction());
			const errorMessage = values(values(error)[1])[0][0];
			setError('serverError', { errorMessage });
			throw error;
		});
};
