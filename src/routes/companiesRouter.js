const companiesRouter = require('express').Router();
const {
  getCompanies,
  getOneCompany,
  registerCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companies');

companiesRouter.get('/', getCompanies);
companiesRouter.get('/:userId', getOneCompany);
companiesRouter.post('/register', registerCompany);
companiesRouter.put('/:userId', updateCompany);
companiesRouter.delete('/:userId', deleteCompany);

module.exports = companiesRouter;
