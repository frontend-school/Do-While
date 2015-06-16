var db = require('./../bootstrap/db.js'),
    Schema = require('mongoose').Schema;

var accountEmailSchema = Schema({
    type: String,
    value: String
});

var accountSchema = Schema({
    providerId: String,
    provider: String,
    _user: {type: Schema.ObjectId, ref: 'users'},
    emails: [accountEmailSchema]
});

module.exports = db.model('accounts', accountSchema);