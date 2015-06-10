var express = require('express'),
    router = express.Router(),
    Project = require('../../models/project');
    Tasks = require('../../models/task');

router.get('/', function (req, res) {

    Project.find().populate('tasks').exec(function (err, projects) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        setTimeout(function () {
            res.json(projects);
        }, 1000);
    });

});

router.get('/:projectId', function (req, res, next) {

    var projectId = req.params.projectId;

    Project
        .findOne({_id: projectId})
        .populate('tasks')
        .exec(function (err, project) {
            if (err) {
                return next(err);
            }
            if (!project) {
                return res.status(404).json('not found');
            }
            res.json(project);
        });
});

router.post('/', function (req, res, next) {

    var project = req.body;

    if (!project.name) {
        return res.status(500).json({
            message: 'name is required'
        });
    }

    if (!project.color) {
        return res.status(500).send({
            message: 'color is required'
        });
    }

    Project.count({
        name: project.name
    }, function (err, hasProjectWithName) {

        if (err) {
            return next(err);
        }

        if (hasProjectWithName) {
            return res.status(500).send({
                message: 'project with the same name is already exist'
            });
        }

        project = Project(project);

        project.save(function (err, project) {
            if (err) {
                return next(err);
            }
            res.json(project);
        });
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
            if (result1[0]._id != req.body.id) {
                statusOfAction.status = 'error';
                statusOfAction.message = 'project with the same name is already exist';
                res.status(500).send(statusOfAction);
                return;
            } else {
                Project.update({
                    _id: req.body.id
                }, {
                    $set: {color: req.body.color}
                }, function (err) {
                    if (err) {
                        statusOfAction.status = 'error';
                        statusOfAction.message = 'can\'t update this project';
                        res.status(500).send(statusOfAction);
                        return;
                    }
                    statusOfAction.status = 'success';
                    statusOfAction.message = 'project color was updated';
                    statusOfAction.data = {
                        _id: req.body.id,
                        name: req.body.name,
                        color: req.body.color
                    };
                    res.status(200).send(statusOfAction);
                });
            }

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
