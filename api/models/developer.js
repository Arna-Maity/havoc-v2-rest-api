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
      login: { type: String, required: true}, // Updating Field
      avatar_url: { type: String},            // Updating Field
      url: { type: String, required: true},   // Updating Field
      html_url: { type: String, required: true}, // Updating Field
      bio: { type: String },                  // Updating Field
    },
  },
  { collection: 'developer' }
);

module.exports = mongoose.model('Developer', developerSchema);
