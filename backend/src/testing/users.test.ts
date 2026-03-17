import app from '../app/app.ts';
import request from 'supertest';

describe('User Handler', () => {
	it('GET /users should return 200 status', async () => {
		const response = await request(app).get('/api/v1/users');
		expect(response.status).toBe(200);
	});
});
