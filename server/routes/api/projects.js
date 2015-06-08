var express = require('express'),
    router = express.Router(),
    Project = require('../../models/project.model');

// This route for getting project data to the client
router.get('/', function (req, res) {

    Project.find({}, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }
        setTimeout(function () {
            res.json({items: result});
        }, 1000);
    });

});

// This route for getting project data from client and saving them to DB
router.post('/', function(req, res) {

    var statusOfAction = {
        status: '',
        message: '',
        data: {}
    };

    if (!req.body.name) {
        statusOfAction.status = 'error';
        statusOfAction.message = 'project name is required';
        res.status(500).send(statusOfAction);
        return;
    }
    if (!req.body.color) {
        statusOfAction.status = 'error';
        statusOfAction.message = 'project color is required';
        res.status(500).send(statusOfAction);
        return;
    }

    // Get Projects from db
    Project.find({
        name: req.body.name
    }, function(err, result) {
        if (err) {
            statusOfAction.status = 'error';
            statusOfAction.message = 'can\'t find data in db';
            res.status(500).send(statusOfAction);
            return;
        }
        if (result && result[0] !== undefined) {
            statusOfAction.status = 'error';
            statusOfAction.message = 'name already exist';
            res.status(500).send(statusOfAction);
            return;
        } else {

            newProject = Project({
                name: req.body.name,
                color: req.body.color,
                taskCount: 0 // This is for demo (random task count)
            });

            newProject.save(function(err) {
                if (err) {
                    statusOfAction.status = 'error';
                    statusOfAction.message = 'can\'t save in db';
                    res.status(500).send(statusOfAction);
                    return;
                }
            });

            statusOfAction.status = 'success';
            statusOfAction.message = 'project was added';
            statusOfAction.data = {
                name: req.body.name,
                color: req.body.color,
                taskCount: 0,
            };
            res.status(200).send(statusOfAction);
        }
    });

});

module.exports = router;
