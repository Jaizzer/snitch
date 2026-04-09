import type { Request, Response } from 'express';
import evaluatePassword from './users.util.ts';
import { z } from 'zod';

const UserInfoSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export function createUser(req: Request, res: Response) {
	const parsingResult = UserInfoSchema.safeParse(req.body);
	if (!parsingResult.success) {
		return res.status(400).json({ message: 'Invalid request' });
	}

	const { password } = parsingResult.data;
	const passwordValidity = evaluatePassword(password);

	if (!passwordValidity.isValid) {
		return res.status(400).json({
			message: passwordValidity.message,
		});
	}

	return res.status(201).json({ message: 'Account created successfully!' });
}
