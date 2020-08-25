
const express = require('express');

const OngController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const {celebrate,Segments,Joi} = require('celebrate')


const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs',celebrate({
    [Segments.BODY]:Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().required().email(),
        whatsappp:Joi.string().required().min(10).max(11),
        city:Joi.string().required(),
        uf:Joi.string().required().length(2)
    })
}), OngController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents',celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number()
    })
}),IncidentController.index);
routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:joi.object().keys({
        id:Joi.number().require()
    })
}),IncidentController.delete);

routes.get('/profile',celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization:joi.string().require()        
    }).unknown()
}),ProfileController.index);

routes.post('/session',SessionController.create);

module.exports = routes;