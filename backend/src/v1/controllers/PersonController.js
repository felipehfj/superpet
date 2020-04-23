const connection = require('../../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, size = 10 } = req.query;
            const [count] = await connection('Person').count();
            const people = await connection('Person')
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

            const person = await connection('Person')
                .where('id', id)
                .select('*')
                .first()

            if (person) {
                return res.json(person);
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

            const { name, email } = req.body;

            const person = await connection('Pet')
                .where('id', id)
                .select('*')
                .first();


            if (person) {
                const updated = {
                    name: name ? name : person.name,
                    email: email ? email : person.email,                    
                }

                await connection('Person').update(updated).where('id', id);

                return res.status(204).send();
            } else {
                return res.status(404).send()
            }
        }
        catch (err) {
            console.log(err)
            return res.status(400).send(err);
        }
    },
    async create(req, res) {
        try {
            const { name, email } = req.body;
            const [count] = await connection('Person').where('email', email).select('*').count();

            if (parseInt(count['count(*)']) > 0) {
                return res.status(400).send({ error: 'Conflicted e-mail' })
            }

            const [id] = await connection('Person').insert({ name, email });
            res.header('Location', `${req.baseUrl}/persons/${id}`);
            return res.status(201).json({ id });
        }
        catch (err) {
            return res.status(400).send(err);
        }

    },
    async delete(req, res) {
        try {
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
        }
        catch (err) {
            return res.status(400).send(err);
        }
    },
}