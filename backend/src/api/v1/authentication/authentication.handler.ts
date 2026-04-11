import { UserInfoSchema } from '../../../lib/validators.ts';
import service from './authentication.service.ts';
import type { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(401).json({ message: 'Invalid request' });
	}

	const { password, email } = parsingResult.data;

	const isLogInCredentialsInvalid = !(await service.isLoginCredentialsValid({
		password,
		email,
	}));

	if (isLogInCredentialsInvalid) {
		return res
			.status(401)
			.json({ message: 'Username/password combination error.' });
	}

	return res.status(200).json({ message: 'Welcome back!' });
}
