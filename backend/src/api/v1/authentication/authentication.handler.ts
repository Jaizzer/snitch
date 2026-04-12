import { UserInfoSchema } from '../../../lib/validators.ts';
import type { Request, Response } from 'express';
import getUserByEmail from '../../../services/getUserByEmail.ts';
import password from '../../../utils/password.ts';
import jwtManager from '../../../utils/jwtManager.ts';

export async function login(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(401).json({ message: 'Invalid request' });
	}

	const submittedPassword = parsingResult.data.password;
	const submittedEmail = parsingResult.data.email;

	const user = await getUserByEmail(submittedEmail);

	const isLoginCredentialsInvalid =
		!user ||
		!(await password.isMatched({
			password: submittedPassword,
			hashedPassword: user.password,
		}));

	if (isLoginCredentialsInvalid) {
		return res
			.status(401)
			.json({ message: 'Username/password combination error.' });
	}

	const token = jwtManager.generateAuthorizationToken({ id: user.id });

	return res.status(200).json({ token });
}
