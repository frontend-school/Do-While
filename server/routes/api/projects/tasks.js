var express = require('express'),
    router = express.Router(),
    Q = require('q'),
    ValidationError = require('../../../lib/ValidationError'),
    Task = require('../../../models/task');

router.post('', function (req, res, next) {
    var task = req.body;

    validateTask(req.project._id, task)
        .then(function (task) {
            task = new Task(task);
            task._project = req.project;
            return Q(task.save());
        })
        .then(function (task) {
            req.project.tasks.push(task);
            return Q(req.project.save());
        })
        .then(function () {
            res.ok(task);
        })
        .catch(function (error) {
            if (error instanceof ValidationError) {
                res.badRequest(error.messages);
            } else {
                next(error);
            }
        });
});

function validateTask(projectId, task) {
    var d = Q.defer(),
        error = new ValidatorError();

    if (!task.name) {
        error.addMessage('name', 'required');
    }
    if (!task.color) {
        error.addMessage('color', 'required');
    }

    task.date = new Date(task.date);

    if (isNaN(task.date.valueOf())) {
        error.addMessage('date', 'invalid');
    }

    if (error.hasMessages()) {
        d.reject(error);
        return d.promise;
    }

    var qParams = {
        _project: projectId,
        name: task.name
    };

    if (task._id) {
        qParams._id = {
            $ne: task._id
        };
    }

    return Q(Task.count(qParams))
        .then(function (isNameExists) {
            if (isNameExists) {
                error.addMessage('name', 'exists');
                throw error;
            }
            return task;
        });
}

module.exports = router;
