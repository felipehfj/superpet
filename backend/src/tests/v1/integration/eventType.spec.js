const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');
const faker =  require('faker/locale/pt_BR');


describe('EVENT TYPE', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create an eventType', async () => {
        const response = await request(app)
            .post('/api/v1/eventTypes')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThan(0);
    });

    it('should be able to get an eventType', async () => {
        const response = await request(app)
        .get('/api/v1/eventTypes/1')
        .send();

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
    });

    it('should be able to get an array of eventType', async () => {
        const response = await request(app)
        .get('/api/v1/eventTypes')
        .send();
        
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should be able to delete an eventType', async () => {
        const response1 = await request(app)
            .post('/api/v1/eventTypes')
            .send({
                name: generateRandom.makeUser(),
                description: generateRandom.makeId(150)
            });
        const id = response1.body.id;

        const response = await request(app)
            .delete(`/api/v1/eventTypes/${id}`)
            .send();

        expect(response.status).toEqual(204);
    });

    it('should be able to do a partial update on eventType', async () => {
        const response = await request(app)
        .patch('/api/v1/eventTypes/2')
        .send({
            name: faker.name.findName(),
            description: faker.lorem.paragraph()
        });

        expect(response.status).toEqual(204);        
    });

    it('should not be able to create an eventType with duplicated name', async () => {
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