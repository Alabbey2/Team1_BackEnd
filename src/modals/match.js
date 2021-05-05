const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  type: {
    type: String,
  },

  talent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Talent',
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
});

matchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Match', matchSchema);
