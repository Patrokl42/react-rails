export const authErrorHandler = (error, setError, setUserBanModal) => {
	if (error?.error) {
		setError({ serverError: 'Credentials are invalid' });
	} else {
		switch (error.message) {
			case 'invalid_grant':
				setError({ serverError: 'Credentials are invalid' });
				break;
			case 'User is banned':
				setError({ serverError: 'User is banned' });
				setUserBanModal(true);
				break;
			case 'Not found':
				setError({ serverError: 'User is not registered' });
				break;
			default:
				setError({ serverError: 'Server Error' });
				break;
		}
	}
};
