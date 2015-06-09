var express = require('express'),
    router = express.Router(),
    Tasks = require('../../models/task.model');

router.post('/', function(req, res) {

    var newTask,
        statusOfAction = {
            status: '',
            message: '',
            data: {}
        };

    newTask = Tasks({
        projectId: req.body.projectId,
        name: req.body.name,
        date: req.body.date
    });

    newTask.save(function(err) {
        if (err) {
            statusOfAction.status = 'error';
            statusOfAction.message = 'can\'t save in db';
            res.status(500).send(statusOfAction);
            return;
        } else {
          statusOfAction.status = 'success';
          res.send(statusOfAction);
        }
    });

});

module.exports = router;
