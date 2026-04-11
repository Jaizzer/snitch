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

async function isLoginCredentialsValid(email: string, password: string) {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	const isEmailNonExistent = !user;
	const isPasswordIncorrect = user?.password === password;

	return isEmailNonExistent || isPasswordIncorrect;
}

export default { isLoginCredentialsValid };
