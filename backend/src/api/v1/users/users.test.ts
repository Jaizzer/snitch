import request from 'supertest';
import app from '../../../routes.ts';
import { z } from 'zod';

const ResponseBody = z.object({
	message: z.string(),
});

describe('Users', () => {
	it('POST /api/v1/users should return 201 status code', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'nBEA~0>2/ar5',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(201);
	});

	it('POST /api/v1/users should return a JSON response format', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'nBEA~0>2/ar5',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.headers['content-type']).toBe(
			'application/json; charset=utf-8',
		);
	});

	it('POST /api/v1/users should return an object with message property', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'nBEA~0>2/ar5',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);
		const parsedData = ResponseBody.safeParse(response.body);

		expect(parsedData.success).toBe(true);
	});

	it('POST /api/v1/users should return 400 status code for empty requests', async () => {
		const response = await request(app).post('/api/v1/users');

		expect(response.status).toBe(400);
	});

	it('POST /api/v1/users should return a 400 status for passwords less than 8 characters', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'pass',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(400);
	});

	it('POST /api/v1/users should return a 400 status for passwords without any digit', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'passwordpassword',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(400);
	});

	it('POST /api/v1/users should return a 400 status for passwords without any upper case', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'passwordpassword1',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(400);
	});

	it('POST /api/v1/users should return a 400 status for passwords without any lower case', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'PASSWORDPASSWORD1',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(400);
	});

	it('POST /api/v1/users should return a 400 status for passwords with white spaces', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: ' PASSWORD pASSWO RD1',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(400);
	});

	it('POST /api/v1/users should return a 400 status for passwords without any symbol', async () => {
		const userInformation = {
			email: 'reznov@viktor.com',
			password: 'PASSWORDpASSWORD1',
		};

		const response = await request(app)
			.post('/api/v1/users')
			.send(userInformation);

		expect(response.status).toBe(400);
	});
});
