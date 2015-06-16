var db = require('./../bootstrap/db.js'),
    Schema = require('mongoose').Schema;

var userSchema = Schema({
    accounts: [{type: Schema.ObjectId, ref: 'accounts'}],
    name: String,
    email: String,
    photo: String,
    access_token: String
});

module.exports = db.model('users', userSchema);