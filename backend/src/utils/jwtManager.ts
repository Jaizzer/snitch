import jwt from 'jsonwebtoken';
import env from '../config/env.ts';
import { type JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';

interface Payload extends JwtPayload {
	id: string;
}

const ParsedPayloadSchema = z.object({
	id: z.string(),
});

function generateAuthorizationToken(payload: Payload) {
	const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '1m' });
	return token;
}

function decodeIdFromToken(token: string) {
	const { payload } = jwt.verify(token, env.jwtSecret, { complete: true });

	if (typeof payload === 'string') {
		return payload;
	}

	try {
		const parsedPayload = ParsedPayloadSchema.parse(payload);
		return parsedPayload.id;
	} catch {
		throw new Error('ID not found from the decoded token.');
	}
}

export default { generateAuthorizationToken, decodeIdFromToken };
