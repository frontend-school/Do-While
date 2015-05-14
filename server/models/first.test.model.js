/**
 * Created by vladkhrapov on 28.04.15.
 */

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'server');

/*
 todo: remove this model.
 its not useful and created only for presentation.

 */
var schema = mongoose.Schema({
    title: String,
    category: String
});

module.exports = db.model('Task_Schema', schema);