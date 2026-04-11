import request from 'supertest';
import app from '../../../app.ts';
import { prisma } from '../../../database/prismaClient.ts';
import passwordManager from '../../../utils/passwordManager.ts';

const userInformation = {
	email: 'reznov@viktor.com',
	password: 'nBEA~0>2/ar5',
};

describe('Authentication', () => {
	beforeEach(async () => {
		await prisma.$transaction([prisma.user.deleteMany()]);
		await prisma.$transaction([
			prisma.user.create({
				data: {
					email: userInformation.email,
					password: await passwordManager.hash(
						userInformation.password,
					),
				},
			}),
		]);
	});

	describe('POST /api/v1/auth/login', () => {
		it('returns a JSON response format', async () => {
			const response = await request(app).post('/api/v1/auth/login');

			expect(response.headers['content-type']).toBe(
				'application/json; charset=utf-8',
			);
		});

		it('returns a 401 status code if the request is empty', async () => {
			const response = await request(app).post('/api/v1/auth/login');

			expect(response.status).toBe(401);
		});

		it('returns a 401 status code if the email is unregistered', async () => {
			const response = await request(app)
				.post('/api/v1/auth/login')
				.send({
					email: 'unregistered@gmail.com',
					password: userInformation.password,
				});

			expect(response.status).toBe(401);
		});

		it('returns a 200 status code if the log in credentials are valid', async () => {
			const response = await request(app)
				.post('/api/v1/auth/login')
				.send(userInformation);
			expect(response.status).toBe(200);
		});
	});
});
