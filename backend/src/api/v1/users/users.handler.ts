import type { Request, Response } from 'express';
import evaluatePassword from './users.util.ts';
import service from './users.service.ts';
import { UserInfoSchema } from '../../../lib/validators.ts';
import passwordManager from '../../../utils/passwordManager.ts';

export async function createUser(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(400).json({ message: 'Invalid request' });
	}

	const { password, email } = parsingResult.data;

	const isEmailExisting = await service.getUserByEmail(email);
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

	await service.createUser({ password: hashedPassword, email });

	return res.status(201).json({ message: 'Account created successfully!' });
}
