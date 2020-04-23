const connection = require('../../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, size = 10 } = req.query;
            const [count] = await connection('Animal').count();
            const people = await connection('Animal')
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

            const animal = await connection('Animal')
                .where('id', id)
                .select('*')
                .first()

            if (animal) {
                return res.json(animal);
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

            const eventType = await connection('Animal')
                .where('id', id)
                .select('*')
                .first();

            if (eventType) {
                const updated = {
                    name: name ? name : eventType.name,
                    description: description ? description : eventType.description
                }                                
                await connection('Animal').update(updated).where('id', id);

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
            const [count] = await connection('Animal').where('name', name).select('*').count();

            if (parseInt(count['count(*)']) > 0) {
                return res.status(400).send({ error: 'Conflicted name' })
            }

            const [id] = await connection('Animal').insert({ name, description });
            res.header('Location', `${req.baseUrl}/animals/${id}`);
            return res.status(201).json({ id });
        }
        catch (err) {
            return res.status(400).send(err);
        }

    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const animal = await connection('Animal')
                .where('id', id)
                .select('*')
                .first()

            if (animal) {
                await connection('Animal')
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