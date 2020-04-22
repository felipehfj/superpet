const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');

describe('PET', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create a pet', async () => {
        const responseAnimal = await request(app)
            .post('/api/v1/animals')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });
            
        const animalId = responseAnimal.body.id;

        const response = await request(app)
            .post('/api/v1/pets')
            .send({
                name: generateRandom.makeUser(),
                color: generateRandom.makeId(6),
                animal: animalId
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThan(0);
    });

    it('should be able to delete an pet', async () => {
        const responseAnimal = await request(app)
            .post('/api/v1/animals')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });
            
        const animalId = responseAnimal.body.id;

        const response2 = await request(app)
            .post('/api/v1/pets')
            .send({
                name: generateRandom.makeUser(),
                color: generateRandom.makeId(6),
                animal: animalId
            });

        const id = response2.body.id;

        const response = await request(app)
            .delete(`/api/v1/pets/${id}`)
            .send();

        expect(response.status).toEqual(204);
    });

    it('should not be able to create a pet with duplicated name', async () => {
        const responseAnimal = await request(app)
            .post('/api/v1/animals')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });

        const animalId = responseAnimal.body.id;

        const pet = {
            name: generateRandom.makeUser(),
            color: generateRandom.makeId(6),
            animal: animalId
        };

        const response = await request(app)
            .post('/api/v1/pets')
            .send(pet);

        const response2 = await request(app)
            .post('/api/v1/pets')
            .send(pet);

        expect(response2.status).toEqual(400);
        expect(response2.body).toHaveProperty('error');
        expect(response2.body.error).toContain('Conflicted name');
    });

});