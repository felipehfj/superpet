const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const generateRandom = require('../../../util/generateRandom');

describe('EVENT', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create an event', async () => {
        
        const response = await request(app)
            .post('/api/v1/events')
            .send({
                pet: 1, 
                eventType: 1, 
                description: "teste", 
                person : 1, 
                sendNotification : true,
                sendAt: new Date()
                
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThan(0);
    });  

    it('should be able to delete an event', async () => {
        const response1 = await request(app)
            .post('/api/v1/events')
            .send({
                pet: 1, 
                eventType: 1, 
                description: "teste", 
                person : 1, 
                sendNotification : true,
                sendAt: new Date()
                
            });

        const id = response1.body.id;

        const response = await request(app)
            .delete(`/api/v1/events/${id}`)
            .send();

        expect(response.status).toEqual(204);
    });

});