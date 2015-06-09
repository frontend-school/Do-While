var express = require('express'),
    router = express.Router(),
    Project = require('../../models/project.model'),
    Tasks = require('../../models/task.model');

// This route for getting project data to the client
router.get('/', function (req, res) {

    Project.find({}, function(err, result) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        setTimeout(function () {
            console.log(result);
            res.json({items: result});
        }, 1000);
    });

});

router.get('/:projectId', function (req, res) {

    var project = req.params.projectId;
    Project.find({_id: project}, function(err, result) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (result.length > 1) {
            res.status(500).send('find more then one result with the same id');
            return;
        }

        Tasks.find({projectId: project}, function (err, result2) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (result2.length === 0) {
                res.json({data: result[0], statusOfTasks: 'no any tasks'});
                return;
            }
            setTimeout(function () {
                res.json({data: result[0], dataTasks: result2});
            }, 1000);
        });
        // there was setTimeout;
    });

});

// This route for getting project data from client and saving them to DB
router.post('/', function(req, res) {

    var newProject,
        statusOfAction = {
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
            statusOfAction.message = 'project with the same name is already exist';
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
            statusOfAction.message = 'project was added in DB';
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
