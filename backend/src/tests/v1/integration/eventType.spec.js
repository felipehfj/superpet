const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');

describe('EVENT TYPE', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create a eventType', async () => {
        const response = await request(app)
            .post('/api/v1/eventTypes')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThan(0);
    });

    it('should not be able to create a eventType with duplicated name', async () => {
        const eventType = {
            name: generateRandom.makeUser(),
            description: generateRandom.makeId(150)
        }

        const response = await request(app)
            .post('/api/v1/eventTypes')
            .send(eventType);

        const response2 = await request(app)
            .post('/api/v1/eventTypes')
            .send(eventType);

        expect(response2.status).toEqual(400);
        expect(response2.body).toHaveProperty('error');
        expect(response2.body.error).toContain('Conflicted name');
    });

});