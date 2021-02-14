const express = require('express');

const routes = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');

// LOGIN
routes.post('/auth/login', AuthController.login);

// USER
routes.post('/auth/register', UserController.create);

// EVENT
routes.post('/events', EventController.create);

module.exports = routes;