import request from 'supertest';
import express from 'express';
import userRoutes from './users.route.ts';

interface body {
	message: string;
}

// Setup app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/users', userRoutes);

describe('User Handler', () => {
	it('GET /users should return the message "Users"', async () => {
		const response = await request(app).get('/api/v1/users');
		const body = response.body as body;
		expect(body.message).toEqual('Users');
	});
});
