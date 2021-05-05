const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userType: {
    type: String,
    default: 'company',
  },

  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  ],

  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],

  likes: [
    {
      type: String,
    },
  ],

  superLikes: [
    {
      type: String,
    },
  ],

  name: {
    type: String,
    required: 'Name is required',
  },

  email: {
    type: String,
    required: 'Email is required',
  },

  password: {
    type: String,
    required: 'Password is required',
  },

  location: {
    type: String,
  },

  website: {
    type: String,
  },

  about: {
    type: String,
  },

  techs: [
    {
      type: String,
    },
  ],

  logo: {
    type: String,
  },
});

companySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Company', companySchema);
