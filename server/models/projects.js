// Get connection to DataBase
var db = require('./../bootstrap/db.connection.js');

// Schema for project-list
var projectsSchema = db.mongoose.Schema({
    name: String,
    color: String,
    tasksCount: Number,
    tasks: Array
    // tasks: [{type: db.mongoose.Schema.ObjectId, ref: 'tasks'}]
});

// Export model to needed controller in Do-While/server/routes
module.exports = db.connection.model('projects', projectsSchema);
