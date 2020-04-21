const connection = require('../../database/connection');

module.exports = {
    async index(req, res) {

        const { page = 1, size = 10 } = req.query;
        const [count] = await connection('Person').count();
        const people = await connection('Person')
            .limit(size)
            .offset((page - 1) * size)
            .select('*');

        res.header('X-Total-Count', count['count(*)'])

        return res.json(people);
    },
    async get(req, res) {
        const { id } = req.params;

        const person = await connection('Person')
            .where('id', id)
            .select('*')
            .first()

        if (person) {
            return res.json(person);
        } else {
            return res.status(404).send()
        }
    },
    async create(req, res) {
        const { name, email } = req.body;
        const [id] = await connection('Person').insert({ name, email });

        res.header('Location', `${req.baseUrl}/persons/${id}`);
        return res.status(201).json({ id });
    },
    async delete(req, res) {
        const { id } = req.params;

        const person = await connection('Person')
            .where('id', id)
            .select('*')
            .first()

        if (person) {
            await connection('Person')
                .where('id', id).delete();

            return res.status(204).send();
        } else {
            return res.status(404).send()
        }
    },
}