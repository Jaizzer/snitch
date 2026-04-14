import type { Request, Response } from 'express';
import evaluatePassword from './users.util.ts';
import service from './users.service.ts';
import { UserInfoSchema } from '../../../lib/validators.ts';
import password from '../../../utils/password.ts';
import getUserByEmail from '../../../services/getUserByEmail.ts';

export async function createUser(req: Request, res: Response) {
	const parsedUserInfo = UserInfoSchema.safeParse(req.body);
	if (!parsedUserInfo.success) {
		return res.status(400).json({ message: 'Invalid request' });
	}

	const submittedPassword = parsedUserInfo.data.password;
	const submittedEmail = parsedUserInfo.data.email;

	const isEmailExisting = await getUserByEmail(submittedEmail);
	if (isEmailExisting) {
		return res.status(400).json({ message: 'Email already exists' });
	}

	const passwordValidity = evaluatePassword(submittedPassword);
	if (!passwordValidity.isValid) {
		return res.status(400).json({
			message: passwordValidity.message,
		});
	}

	const hashedPassword = await password.hash(submittedPassword);

	const user = await service.createUser({
		hashedPassword: hashedPassword,
		email: submittedEmail,
	});

	return res.status(201).json({ email: user.email, id: user.id });
}

export function getUser(req: Request, res: Response) {
	return res.status(200).json({ message: 'user' });
}

export function updateUser(req: Request, res: Response) {
	return res.status(204).json({ message: 'User updated successfully' });
}
