const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);

router.post('/create-user', usersController.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}

), usersController.createUserSession);

router.get('/signout', usersController.signout);
module.exports = router;