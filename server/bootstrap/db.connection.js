// Connection to Mongoose
var mongoose = require('mongoose');
var connection = mongoose.createConnection('localhost', 'server');

// Export connection to all models in Do-While/server/models
module.exports = {
    connection: connection,
    mongoose: mongoose
};