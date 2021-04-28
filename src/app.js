const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const { MONGODB_URI } = require('./utils/config');
const jobsRouter = require('./routes/jobsRouter');
const talentsRouter = require('./routes/talentsRouter');
const companiesRouter = require('./routes/companiesRouter');
const loginRouter = require('./routes/loginRouter');

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

app.use('/api/jobs', jobsRouter);
app.use('/api/talents', talentsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/login', loginRouter);

module.exports = app;
