const express = require('express');
const passport = require('passport');

const route = express.Router();
const postApi = require('../../../controllers/api/v1/posts_api');

route.get('/', postApi.index);

route.delete('/:id', passport.authenticate('jwt', {session: false}), postApi.destroy);

module.exports = route;