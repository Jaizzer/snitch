import request from 'supertest';
import app from '../../../app/app.ts';
import { z } from 'zod';

const ResponseBody = z.object({
	message: z.string(),
});

describe('Users', () => {
	it('POST /api/v1/users should return 201 status code', async () => {
		const response = await request(app).post('/api/v1/users');
		expect(response.status).toBe(201);
	});

	it('POST /api/v1/users should return a JSON response format', async () => {
		const response = await request(app).post('/api/v1/users');
		expect(response.headers['content-type']).toBe(
			'application/json; charset=utf-8',
		);
	});

	it('POST /api/v1/users should return an object with message property', async () => {
		const response = await request(app).post('/api/v1/users');
		const parsedData = ResponseBody.safeParse(response.body);
		expect(parsedData.success).toBe(true);
	});
});
