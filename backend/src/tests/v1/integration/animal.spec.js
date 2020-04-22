const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');
const faker = require('faker/locale/pt_BR');

describe('ANIMAL', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create an animal', async () => {
        const response = await request(app)
            .post('/api/v1/animals')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });

        console.log(faker.internet.email());
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThan(0);
    });

    it('should be able to delete an animal', async () => {
        const response1 = await request(app)
            .post('/api/v1/animals')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });

        const id = response1.body.id;

        const response = await request(app)
            .delete(`/api/v1/animals/${id}`)
            .send();

        expect(response.status).toEqual(204);
    });

    it('should not be able to create a animal with duplicated name', async () => {
        const animal = {
            name: generateRandom.makeUser(),
            description: generateRandom.makeId(150)
        }

        const response = await request(app)
            .post('/api/v1/animals')
            .send(animal);

        const response2 = await request(app)
            .post('/api/v1/animals')
            .send(animal);

        expect(response2.status).toEqual(400);
        expect(response2.body).toHaveProperty('error');
        expect(response2.body.error).toContain('Conflicted name');
    });

});