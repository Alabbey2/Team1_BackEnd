const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String
  },
  message: {
    type: String,
  },
  created_at: {
    type : Date,
    default: Date.now
  },
});

matchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Message', matchSchema);
