interface UserCredentials {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			userCredentials?: UserCredentials;
		}
	}
}

export {};
