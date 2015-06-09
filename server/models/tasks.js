// Get connection to DataBase
var db = require('./../bootstrap/db.connection.js');

// Schema for list-of-tasks
var tasksSchema = db.mongoose.Schema({
    // project: {type: db.mongoose.Schema.ObjectId, ref: 'projects'},
    projectId: String,
    name: String,
    date: String,
    notificationTime: String,
    accessTime: String,
    isReady: Boolean
});

// Export model to needed controller in Do-While/server/routes
module.exports = db.connection.model('tasks', tasksSchema);
