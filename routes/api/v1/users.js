const express = require('express');

const route = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');

route.post('/create-session', usersApi.createUserSession);
module.exports = route;