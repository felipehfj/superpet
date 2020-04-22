const connection = require('../../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, size = 10 } = req.query;
            const [count] = await connection('Event').count();
            const event = await connection('Event')
                .join('Pet', 'Pet.id', '=', 'Event.pet')
                .join('EventType', 'EventType.id', '=', 'Event.eventType')
                .limit(size)
                .offset((page - 1) * size)                
                .select(['event.*', 'Pet.name as petName', 'EventType.name as eventTypeName']);

            res.header('X-Total-Count', count['count(*)'])

            return res.json(event);
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
    async get(req, res) {
        try {
            const { id } = req.params;

            const event = await connection('Event')
            .join('Pet', 'Pet.id', '=', 'Event.pet')
                .join('EventType', 'EventType.id', '=', 'Event.eventType')
                .where('id', id)
                .select(['event.*', 'Pet.name as petName', 'EventType.name as eventTypeName'])
                .first()

            if (event) {
                return res.json(event);
            } else {
                return res.status(404).send()
            }
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
    async create(req, res) {
        try {
            const { pet, eventType, description, person, sendNotification, sendAt } = req.body;
            
            const [id] = await connection('Event').insert({ pet, eventType, description });
            
            const [relationshipId] = await connection('Relationship').insert({ event: id, person, sendNotification, sendAt });

            res.header('Location', `${req.baseUrl}/events/${id}`);
            return res.status(201).json({ id });
        }
        catch (err) {
            return res.status(400).send(err);
        }

    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const event = await connection('Event')
                .where('id', id)
                .select('*')
                .first()

            if (event) {
                await connection('Relationship')
                    .where('event', event.id).delete();

                await connection('Event')
                    .where('id', id).delete();

                return res.status(204).send();
            } else {
                return res.status(404).send()
            }
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
}