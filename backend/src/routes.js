const express = require('express');
const routes = express.Router();

const routes_v1 = require('./v1/routes');

routes.use('/api/v1', routes_v1);

routes.get('*', (req, res) =>{
    res.status(404).send({data:'not found'});
})

module.exports = routes;