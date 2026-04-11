import type { Request, Response } from 'express';
import evaluatePassword from './users.util.ts';
import { z } from 'zod';
import service from './users.service.ts';

const UserInfoSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export async function createUser(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(400).json({ message: 'Invalid request' });
	}

	const { password, email } = parsingResult.data;

	const passwordValidity = evaluatePassword(password);
	if (!passwordValidity.isValid) {
		return res.status(400).json({
			message: passwordValidity.message,
		});
	}

	const isEmailExisting = await service.getUserByEmail(email);
	if (isEmailExisting) {
		return res.status(400).json({ message: 'Email already exists' });
	}

	await service.createUser({ password, email });

	return res.status(201).json({ message: 'Account created successfully!' });
}
