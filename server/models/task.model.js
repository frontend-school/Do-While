// Get connection to DataBase
var db = require('./../bootstrap/db.connection.js');

// Schema for list-of-tasks
var taskListSchema = db.mongoose.Schema({
    projectId: String,
    name: String,
    date: String,
    notificationTime: String,
    accessTime: String
});

// Export model to needed controller in Do-While/server/routes
module.exports = db.connection.model('TaskListSchema', taskListSchema);
