const talentsRouter = require('express').Router();
const {
  registerTalent,
  getTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
  like,
  superlike,
} = require('../controllers/talents');

talentsRouter.get('/', getTalents);
talentsRouter.get('/:userId', getOneTalent);
talentsRouter.post('/register', registerTalent);
talentsRouter.put('/:userId', updateTalent);
talentsRouter.delete('/:userId', deleteTalent);
talentsRouter.post('/like', like);
talentsRouter.post('/superlike', superlike);

module.exports = talentsRouter;
