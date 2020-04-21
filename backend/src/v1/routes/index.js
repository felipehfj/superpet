const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

const PersonController = require('../controllers/PersonController');

routes.get('/persons', PersonController.index);
routes.get('/persons/:id', PersonController.get);
routes.post('/persons', PersonController.create);
routes.delete('/persons/:id', PersonController.delete);

module.exports = routes;