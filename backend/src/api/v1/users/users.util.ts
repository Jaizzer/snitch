interface PasswordValidity {
	isValid: boolean;
	message?: string;
}

export default function evaluatePassword(password: string): PasswordValidity {
	if (password.length < 8) {
		return {
			isValid: false,
			message: 'Password must be at least 8 characters long',
		};
	}

	const passwordHasNoDigit = !/\d/.exec(password);
	if (passwordHasNoDigit) {
		return {
			isValid: false,
			message: 'Password must include at least 1 digit',
		};
	}

	const passwordHasNoUpperCase = !/(?=.*?[A-Z]).*/.exec(password);
	if (passwordHasNoUpperCase) {
		return {
			isValid: false,
			message: 'Password must include at least 1 upper case',
		};
	}

	const passwordHasNoLowerCase = !/(?=.*?[a-z]).*/.exec(password);
	if (passwordHasNoLowerCase) {
		return {
			isValid: false,
			message: 'Password must include at least 1 lower case',
		};
	}

	const passwordHasWhiteSpace = /\s/.exec(password);
	if (passwordHasWhiteSpace) {
		return {
			isValid: false,
			message: 'Password must not contain any white spaces',
		};
	}

	return {
		isValid: true,
	};
}
