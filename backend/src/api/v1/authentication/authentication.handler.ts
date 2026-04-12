import { UserInfoSchema } from '../../../lib/validators.ts';
import type { Request, Response } from 'express';
import getUserByEmail from '../../../services/getUserByEmail.ts';
import passwordManager from '../../../utils/passwordManager.ts';

export async function login(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(401).json({ message: 'Invalid request' });
	}

	const { password, email } = parsingResult.data;

	const user = await getUserByEmail(email);

	if (!user) {
		return res
			.status(401)
			.json({ message: 'Username/password combination error.' });
	}

	const isPasswordIncorrect = !(await passwordManager.compare({
		password: password,
		hash: user.password,
	}));

	if (isPasswordIncorrect) {
		return res
			.status(401)
			.json({ message: 'Username/password combination error.' });
	}

	return res.status(200).json({ message: 'Welcome back!' });
}
