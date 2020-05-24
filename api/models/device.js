const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    model: String,
    pk: String,
    fields: {
      Codename: { type: String, required: true, unique: true },
      Maintainer: { type: String, required: false },
      Sflink: { type: String, required: true },
      Xdalink: { type: String, required: false },
      link: { type: String, required: true },
    },
  },
  { collection: 'device' }
);

module.exports = mongoose.model('Device', deviceSchema);
