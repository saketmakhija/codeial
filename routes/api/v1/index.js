const express = require('express');

const route = express.Router();

route.use('/posts', require('./posts'));
route.use('/users', require('./users'));
module.exports = route;