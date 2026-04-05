import type { Request, Response } from 'express';

export function createUser(req: Request, res: Response) {
	res.status(201).send({ message: 'Account created successfully!' });
}
