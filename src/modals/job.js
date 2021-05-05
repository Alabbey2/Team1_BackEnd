const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },

  title: {
    type: String,
    required: 'Job title is required',
  },

  type: [
    {
      type: String,
      required: 'Job type is required',
    },
  ],

  level: {
    type: String,
    required: 'Job level is required',
  },

  deadline: {
    type: String,
    required: 'Job deadline is required',
  },

  description: {
    type: String,
    required: 'Job description is required',
  },

  location: {
    type: String,
    required: 'Job location is required',
  },

  techs: [
    {
      type: String,
      required: 'Techs are required',
    },
  ],
});

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Job', jobSchema);
