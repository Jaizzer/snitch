import type { Request, Response } from 'express';
import evaluatePassword from './users.util.ts';
import service from './users.service.ts';
import { UserInfoSchema } from '../../../lib/validators.ts';
import passwordManager from '../../../utils/passwordManager.ts';
import getUserByEmail from '../../../services/getUserByEmail.ts';

export async function createUser(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(400).json({ message: 'Invalid request' });
	}

	const { password, email } = parsingResult.data;

	const isEmailExisting = await getUserByEmail(email);
	if (isEmailExisting) {
		return res.status(400).json({ message: 'Email already exists' });
	}

	const passwordValidity = evaluatePassword(password);
	if (!passwordValidity.isValid) {
		return res.status(400).json({
			message: passwordValidity.message,
		});
	}

	const hashedPassword = await passwordManager.hash(password);

	const user = await service.createUser({ password: hashedPassword, email });

	return res.status(201).json({ email: user.email, id: user.id });
}

export function getUser(req: Request, res: Response) {
	return res.status(200).json({ message: 'user' });
}
