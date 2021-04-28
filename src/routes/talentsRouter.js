const talentsRouter = require('express').Router();
const {
  registerTalent,
  getTalents,
  getOneTalent,
  updateTalent,
  deleteTalent,
} = require('../controllers/talents');

talentsRouter.get('/', getTalents);
talentsRouter.get('/:userId', getOneTalent);
talentsRouter.post('/register', registerTalent);
talentsRouter.put('/:userId', updateTalent);
talentsRouter.delete('/:userId', deleteTalent);

module.exports = talentsRouter;
