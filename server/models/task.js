var db = require('./../bootstrap/db.js'),
    Schema = require('mongoose').Schema;

var taskSchema = Schema({
    _project: {type: Schema.ObjectId, ref: 'projects'},
    name: String,
    date: Date,
    notificationTime: Date,
    accessTime: Date,
    isReady: Boolean
});

module.exports = db.model('tasks', taskSchema);
