import jwt from 'jsonwebtoken';
import env from '../config/env.ts';

interface Payload {
	id: number;
}

function generateAuthorizationToken(payload: Payload) {
	const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '1m' });
	return token;
}

function decodeToken(token: string) {
	return jwt.verify(token, env.jwtSecret);
}

export default { generateAuthorizationToken, decodeToken };
