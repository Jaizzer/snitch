interface UserCredentials {
	id: string;
	email: string;
	isUserVerified: boolean;
}

declare global {
	namespace Express {
		interface Request {
			userCredentials?: UserCredentials;
		}
	}
}

export {};
