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

	const atleastOneDigitRegEx = /\d/;
	if (!atleastOneDigitRegEx.exec(password)) {
		return {
			isValid: false,
			message: 'Password must include at least 1 digit',
		};
	}

	const atleastOneUpperCaseRegEx = /(?=.*?[A-Z]).*/;
	if (!atleastOneUpperCaseRegEx.exec(password)) {
		return {
			isValid: false,
			message: 'Password must include at least 1 upper case',
		};
	}

	return {
		isValid: true,
	};
}
