const mongoose = require('mongoose') ;
const updateDeveloperSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: { type: String, required: true},
        main: {
            login: { type: String, required: true},
            avatar_url: { type: String},
            url: { type: String, required: true},
            html_url: { type: String, required: true},
            bio: { type: String },
        }
    }
)

module.exports = mongoose.model('updateDeveloper', updateDeveloperSchema) ;