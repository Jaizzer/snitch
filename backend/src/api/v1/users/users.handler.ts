import type { Request, Response } from 'express';

export function createUser(req: Request, res: Response) {
	res.status(201).json({ message: 'Account created successfully!' });
}
