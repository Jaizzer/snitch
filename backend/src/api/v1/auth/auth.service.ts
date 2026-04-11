import jwt, { type JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../../database/prismaClient.ts';

export function generateToken(payload: string, jwtSecret: string): string {
	return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

export function verifyToken(
	token: string,
	jwtSecret: string,
): string | JwtPayload {
	return jwt.verify(token, jwtSecret);
}

async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: { email },
	});
	return user;
}

export default { getUserByEmail };
