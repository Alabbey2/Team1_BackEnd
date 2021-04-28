const loginRouter = require('express').Router();

const loginUser = require('../controllers/login');

loginRouter.use('/', loginUser);

module.exports = loginRouter;
