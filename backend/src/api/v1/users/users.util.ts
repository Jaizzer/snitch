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

	return {
		isValid: true,
	};
}
