import jwt from 'jsonwebtoken';
import env from '../config/env.ts';

interface Payload {
	id: string;
}

function generateAuthorizationToken(payload: Payload) {
	const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '1m' });
	return token;
}

function decodeIdFromToken(token: string) {
	return jwt.verify(token, env.jwtSecret);
}

export default { generateAuthorizationToken, decodeIdFromToken };
