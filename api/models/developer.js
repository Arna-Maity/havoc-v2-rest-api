const mongoose = require('mongoose');

const developerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    model: { type: String, required: true },
    pk: { type: String, required: true },
    fields: {
      Name: { type: String, required: true },
      Role: { type: String, required: true },
      Desc: { type: String },
      Imlink: { type: String },
      Xdalink: { type: String },
      Gitlink: { type: String },
      Paylink: { type: String },
      Tellink: { type: String },
      gitApiUrlSpecifier: { type: String },
    },
  },
  { collection: 'developer' }
);

module.exports = mongoose.model('Developer', developerSchema);
