const request = require('supertest');
const app = require('../../app');

describe('APP', () => {
    it('should be able to make a web get request', async() =>{
        const response = await request(app)
        .get('/api/v1');

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(9);
    });
});