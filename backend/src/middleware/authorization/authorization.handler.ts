import type { Request, Response, NextFunction } from 'express';
import jwtManager from '../../utils/jwtManager.ts';
import getUserById from '../../services/getUserById.ts';

export default async function authorize(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers.authorization;

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Access Denied. No token provided' });
	}

	try {
		const id = jwtManager.decodeIdFromToken(token);

		const user = await getUserById(id);

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		req.userCredentials = {
			id: user.id,
			email: user.email,
			isUserVerified: user.isVerified,
		};

		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: 'Invalid Token' });
	}
}
