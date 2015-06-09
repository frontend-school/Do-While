// Get connection to DataBase
var db = require('./../bootstrap/db.connection.js');

// Schema for project-list
var projectListSchema = db.mongoose.Schema({
    name: String,
    color: String,
    taskCount: Number
});

// Export model to needed controller in Do-While/server/routes
module.exports = db.connection.model('ProjectListSchema', projectListSchema);
