import jwt, { type JwtPayload } from 'jsonwebtoken';

export function generateToken(payload: string, jwtSecret: string): string {
	return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

export function verifyToken(
	token: string,
	jwtSecret: string,
): string | JwtPayload {
	return jwt.verify(token, jwtSecret);
}
