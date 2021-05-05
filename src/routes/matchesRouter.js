const matchesRouter = require('express').Router();
const { getAllMatches, createMatch } = require('../controllers/matches');

matchesRouter.get('/:type/:id', getAllMatches);
matchesRouter.post('/', createMatch);

module.exports = matchesRouter;
