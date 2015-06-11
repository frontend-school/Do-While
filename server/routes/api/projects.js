var express = require('express'),
    router = express.Router(),
    Project = require('../../models/projects'),
    Tasks = require('../../models/tasks');

// This route for getting project data to the client
router.get('/', function (req, res) {

    Project.find({}, function(err, findedProject) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        findedProject.forEach(function (item) {
            Tasks.count({projectId: item._id}, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                item.tasksCount = result;
            });
        });

        setTimeout(function () {
            res.json(findedProject);
        }, 1000);
    });

});

router.get('/:projectId', function (req, res) {

    var project = req.params.projectId;

    Project.find({_id: project}, function(err, findedProject) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (findedProject.length > 1) {
            res.status(500).send('find more then one result with the same id');
            return;
        }

        Tasks.find({projectId: project}, function (err, findedTasks) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            setTimeout(function () {
                findedProject[0].tasks = findedTasks;
                res.json({data: findedProject[0]});
            }, 1000);
        });
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
                tasks: []
            });

            newProject.save(function(err, result) {
                if (err) {
                    statusOfAction.status = 'error';
                    statusOfAction.message = 'can\'t save in db';
                    res.status(500).send(statusOfAction);
                    return;
                }
                statusOfAction.status = 'success';
                statusOfAction.message = 'project was added in DB';
                statusOfAction.data = {
                    _id: result._id,
                    name: result.name,
                    color: result.color,
                    tasksCount: 0,
                    tasks: []
                };
                res.status(200).send(statusOfAction);
            });

        }
    });

});

router.post('/edit', function(req, res) {

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
    }, function(err, result1) {
        if (err) {
            statusOfAction.status = 'error';
            statusOfAction.message = 'can\'t find data in db';
            res.status(500).send(statusOfAction);
            return;
        }
        if (result1.length > 1) {
            statusOfAction.status = 'error';
            statusOfAction.message = 'find more than one projects';
            res.status(500).send(statusOfAction);
            return;
        }
        if (result1 && result1[0] !== undefined) {
            statusOfAction.status = 'error';
            statusOfAction.message = 'project with the same name is already exist';
            res.status(500).send(statusOfAction);
            return;
        } else {

            Project.update({
                _id: req.body.id
            }, {
                $set: {name: req.body.name, color: req.body.color}
            }, function (err) {
                if (err) {
                    statusOfAction.status = 'error';
                    statusOfAction.message = 'can\'t find project with current id';
                    res.status(500).send(statusOfAction);
                    return;
                }
                statusOfAction.status = 'success';
                statusOfAction.message = 'project was updated';
                statusOfAction.data = {
                    _id: req.body.id,
                    name: req.body.name,
                    color: req.body.color
                };
                res.status(200).send(statusOfAction);
            });

        }
    });

});

module.exports = router;
