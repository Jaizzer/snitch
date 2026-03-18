import app from '../app/app.ts';
import request from 'supertest';

interface body {
	message: string;
}

describe('User Handler', () => {
	it('GET /users should return the message "Users"', async () => {
		const response = await request(app).get('/api/v1/users');
		const body = response.body as body;
		expect(body.message).toEqual('Users');
	});
});
