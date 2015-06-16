var db = require('./../bootstrap/db.js'),
    Schema = require('mongoose').Schema;

var projectSchema = Schema({
    name: String,
    color: String,
    tasks: [{type: Schema.ObjectId, ref: 'tasks'}]
});

module.exports = db.model('projects', projectSchema);
