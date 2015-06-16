var express = require('express'),
    router = express.Router(),
    Task = require('../../models/task');

router.param('taskId', function (req, res, next, taskId) {

    var tasksQ = Task.findById(taskId);
    var isExpandProject = req.query.isExpand('project');

    if (isExpandProject) {
        tasksQ = tasksQ.populate('project');
    }

    tasksQ
        .exec(function (err, task) {
            if (err) {
                return next(err);
            }

            if (!task) {
                return res.notFound();
            }

            req.task = task;

            next();
        });
});

router.get('/', function (req, res, next) {

    var qParams = {};

    var fromDate = new Date(req.query.fromDate);
    var toDate = new Date(req.query.toDate);

    if (!isNaN(fromDate)) {
        qParams.date = {};
        qParams.date.$ge = resetTime(fromDate).toISOString();
    }

    if (!isNaN(toDate)) {
        qParams.date = qParams.date || {};
        qParams.date.$le = addDay(resetTime(toDate)).toISOString();
    }

    var tasksQ = Task.find(qParams);

    if (req.query.isExpand('project')) {
        tasksQ = tasksQ.populate('project');
    }

    tasksQ
        .exec(function (err, tasks) {
            if (err) {
                return next(err);
            }
            res.ok(tasks);
        });
});

router.get('/:taskId', function (req, res) {
    res.json(req.task);
});

router.put('/:taskId', function (req, res, next) {

    validateTask(req.task)
        .then(function (task) {
            return Q(task.save());
        })
        .then(function (task) {
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

router.delete('/:taskId', function (req, res, next) {
    Q(req.task.remove())
        .then(function () {
            res.ok();
        })
        .catch(next);
});

function validateTask(task) {
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

function resetTime(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function addDay(date) {
    var millisecondsInDay = 24 * 60 * 60 * 1000;
    return new Date(date.valueOf() + millisecondsInDay);
}

module.exports = router;
