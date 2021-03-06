const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);

router.post('/create-user', usersController.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}

), usersController.createUserSession);

router.get('/signout', usersController.signout);

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), usersController.createUserSession);


module.exports = router;