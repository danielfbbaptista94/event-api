const express = require('express');

const routes = express.Router();
const EventController = require('../controllers/EventController');
const UserController = require('../controllers/UserController');

// USER
routes.post('/users', UserController.create);

// EVENT
routes.post('/events', EventController.create);

module.exports = routes;