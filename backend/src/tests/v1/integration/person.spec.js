const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');
const faker =  require('faker/locale/pt_BR');

describe('PERSON', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
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

    it('should be able to get a person', async () => {
        const response = await request(app)
        .get('/api/v1/persons/1')
        .send();

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    it('should be able to get an array of person', async () => {
        const response = await request(app)
        .get('/api/v1/persons')
        .send();
        
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });    

    it('should be able to delete an person', async () => {
        const response1 = await request(app)
            .post('/api/v1/persons')
            .send({
                name: generateRandom.makeUser(),
                email: generateRandom.makeEmail()
            });

        const id = response1.body.id;

        const response = await request(app)
            .delete(`/api/v1/persons/${id}`)
            .send();

        expect(response.status).toEqual(204);
    });

    it('should be able to do a partial update on person', async () => {
        const response = await request(app)
        .patch('/api/v1/persons/2')
        .send({
            name: faker.name.findName(),
            email: faker.internet.email(),            
        });

        expect(response.status).toEqual(204);        
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