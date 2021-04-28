const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  userType: {
    type: String,
    default: 'talent',
  },

  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
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

  firstName: {
    type: String,
    required: 'FirstName is required',
  },

  lastName: {
    type: String,
    required: 'LastName is required',
  },

  email: {
    type: String,
    required: 'Email is required',
  },

  password: {
    type: String,
    required: 'Password is required',
  },

  phone: {
    type: String,
  },

  location: {
    type: String,
  },

  title: {
    type: String,
  },

  github: {
    type: String,
  },

  linkedin: {
    type: String,
  },

  about: {
    type: String,
  },

  level: {
    type: String,
  },

  type: [
    {
      type: String,
    },
  ],

  techs: [
    {
      type: String,
    },
  ],
  photo: {
    type: String,
  },
});

talentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Talent', talentSchema);
