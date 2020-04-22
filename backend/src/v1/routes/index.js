const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

const PersonController = require('../controllers/PersonController');
const AnimalController = require('../controllers/AnimalController');
const PetController = require('../controllers/PetController');
const EventTypeController = require('../controllers/EventTypeController');

const validate = { 
    person:{
        create:celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required().max(100),
                email: Joi.string().required().email().max(100),                
            })    
        }),
        index: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
                size: Joi.number(),
            })
        }),
        get: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
        delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
    },
    animal:{
        create:celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required().max(100), 
                description: Joi.string().max(4000),                
            })    
        }),
        index: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
                size: Joi.number(),
            })
        }),
        get: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
        delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
    },
    eventType:{
        create:celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required().max(100), 
                description: Joi.string().max(4000),                
            })    
        }),
        index: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
                size: Joi.number(),
            })
        }),
        get: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
        delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
    },
    pet:{
        create:celebrate({
            [Segments.BODY]: Joi.object().keys({
                animal: Joi.number().required(),
                name: Joi.string().required().max(100), 
                color: Joi.string().max(50),                
            })    
        }),
        index: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
                size: Joi.number(),
            })
        }),
        get: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
        delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
    },
    event:{
        create:celebrate({
            [Segments.BODY]: Joi.object().keys({
                pet: Joi.number().required(),
                eventType: Joi.number().required(),
                description: Joi.string().required().max(50000), 
                sendNotification: Joi.boolean(),
                sendAt: Joi.date(), //!!sendNotification ? Joi.date().required(): Joi.date(),                             
            })    
        }),
        index: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
                size: Joi.number(),
            })
        }),
        get: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
        delete: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            })
        }),
    }
}

routes.get('/persons', validate.person.index, PersonController.index);
routes.get('/persons/:id', validate.person.get, PersonController.get);
routes.post('/persons',validate.person.create, PersonController.create);
routes.delete('/persons/:id', validate.person.delete ,PersonController.delete);

routes.get('/animals', validate.animal.index, AnimalController.index);
routes.get('/animals/:id', validate.animal.get, AnimalController.get);
routes.post('/animals',validate.animal.create, AnimalController.create);
routes.delete('/animals/:id', validate.animal.delete ,AnimalController.delete);

routes.get('/pets', validate.pet.index, PetController.index);
routes.get('/pets/:id', validate.pet.get, PetController.get);
routes.post('/pets',validate.pet.create, PetController.create);
routes.delete('/pets/:id', validate.pet.delete ,PetController.delete);

routes.get('/eventTypes', validate.eventType.index, EventTypeController.index);
routes.get('/eventTypes/:id', validate.eventType.get, EventTypeController.get);
routes.post('/eventTypes',validate.eventType.create, EventTypeController.create);
routes.delete('/eventTypes/:id', validate.eventType.delete ,EventTypeController.delete);

module.exports = routes;