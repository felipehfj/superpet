const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');

describe('PERSON', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create a person', async () => {
        const response = await request(app)
            .post('/api/v1/persons')
            .send({
                name: generateRandom.makeUser(),
                email: generateRandom.makeEmail()
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThan(0);
    });

    it('should not be able to create a person with duplicated email', async () => {
        const person = {
            name: generateRandom.makeUser(),
            email: generateRandom.makeEmail()
        }

        const response = await request(app)
            .post('/api/v1/persons')
            .send(person);

        const response2 = await request(app)
            .post('/api/v1/persons')
            .send(person);

        expect(response2.status).toEqual(400);
        expect(response2.body).toHaveProperty('error');
        expect(response2.body.error).toContain('Conflicted e-mail');
    });

});