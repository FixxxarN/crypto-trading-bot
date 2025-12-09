import request from 'supertest';
import { server } from '..';

describe('index', () => {
	afterAll(() => {
		server.close();
	});

	it('should setup api', async () => {
		const response = await request(server).get('/');

		expect(response.status).toEqual(200);
		expect(response.text).toEqual('Hello, world!');
	});
});
