import type { Request, Response } from 'express';
import { z } from 'zod';

const UserInfoSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export function createUser(req: Request, res: Response) {
	const userInfo = UserInfoSchema.safeParse(req.body);
	if (!userInfo.success) {
		res.status(400).json({ message: '' });
	}
	res.status(201).json({ message: 'Account created successfully!' });
}
