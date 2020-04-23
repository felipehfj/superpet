const connection = require('../../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, size = 10 } = req.query;
            const [count] = await connection('EventType').count();
            const people = await connection('EventType')
                .limit(size)
                .offset((page - 1) * size)
                .select('*');

            res.header('X-Total-Count', count['count(*)'])

            return res.json(people);
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
    async get(req, res) {
        try {
            const { id } = req.params;

            const eventType = await connection('EventType')
                .where('id', id)
                .select('*')
                .first()

            if (eventType) {
                return res.json(eventType);
            } else {
                return res.status(404).send()
            }
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
    async patch(req, res) {
        try {
            const { id } = req.params;

            const { name, description } = req.body;

            const eventType = await connection('EventType')
                .where('id', id)
                .select('*')
                .first();

            if (eventType) {
                const updated = {
                    name: name ? name : eventType.name,
                    description: description ? description : eventType.description
                }                                
                await connection('EventType').update(updated).where('id', id);

                return res.status(204).send();
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
            const { name, description } = req.body;
            const [count] = await connection('EventType').where('name', name).select('*').count();

            if (parseInt(count['count(*)']) > 0) {
                return res.status(400).send({ error: 'Conflicted name' })
            }

            const [id] = await connection('EventType').insert({ name, description });
            res.header('Location', `${req.baseUrl}/eventTypes/${id}`);
            return res.status(201).json({ id });
        }
        catch (err) {
            return res.status(400).send(err);
        }

    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const eventType = await connection('EventType')
                .where('id', id)
                .select('*')
                .first()

            if (eventType) {
                await connection('EventType')
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