import request from 'supertest';
import app from '../../../app/app.ts';
import { z } from 'zod';

const ResponseBody = z.object({
	message: z.string(),
});

describe('Users', () => {
	it('POST /api/v1/users should return 201 and confirmation for valid input', async () => {
		const response = await request(app).post('/api/v1/users');
		const body = ResponseBody.parse(response.body);
		expect(response.status).toBe(201);
		expect(body.message).toBe('Account created successfully!');
	});
});
