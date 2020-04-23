const connection = require('../../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, size = 10 } = req.query;
            const [count] = await connection('Pet').count();
            const people = await connection('Pet')
                .join('Animal', 'Animal.id', '=', 'Pet.animal')
                .limit(size)
                .offset((page - 1) * size)                                
                .select(['Pet.*', 'Animal.name as animalName']);

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

            const pet = await connection('Pet')
                .join('Animal', 'Animal.id', '=', 'Pet.animal')
                .where('Pet.id', id)
                .select(['Pet.*', 'Animal.name as animalName'])
                .first()

            if (pet) {
                return res.json(pet);
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
            const { name, color, animal } = req.body;
            const [count] = await connection('Pet').where('name', name).select('*').count();

            if (parseInt(count['count(*)']) > 0) {
                return res.status(400).send({ error: 'Conflicted name' })
            }

            const [id] = await connection('Pet').insert({ name, color, animal });
            res.header('Location', `${req.baseUrl}/pets/${id}`);
            return res.status(201).json({ id });
        }
        catch (err) {
            return res.status(400).send(err);
        }

    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const pet = await connection('Pet')
                .where('id', id)
                .select('*')
                .first()

            if (pet) {
                await connection('Pet')
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