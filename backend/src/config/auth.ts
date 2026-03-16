import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from './config';

export function generateToken(payload: string): string {
	return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

export function verifyToken(token: string): string | JwtPayload {
	return jwt.verify(token, config.jwtSecret);
}
