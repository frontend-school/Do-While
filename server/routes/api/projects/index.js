var express = require('express'),
    router = express.Router(),
    Project = require('../../../models/project'),
    Q = require('q'),
    ValidationError = require('../../../lib/ValidationError');

router.param('projectId', function (req, res, next, projectId) {

    var projectsQ = Project.findById(projectId);
    var isExpandTasks = req.query.isExpand('tasks');

    if (isExpandTasks) {
        projectsQ = projectsQ.populate('tasks');
    }

    projectsQ
        .exec(function (err, project) {
            if (err) {
                return next(err);
            }

            if (!project) {
                return res.notFound();
            }

            req.project = project;

            next();
        });
});

router.get('/:projectId', function (req, res) {
    res.json(req.project);
});

router.get('/', function (req, res, next) {

    var projectsQ = Project.find();

    if (req.query.isExpand('tasks')) {
        projectsQ = projectsQ.populate('tasks');
    }

    projectsQ
        .exec(function (err, projects) {
            if (err) {
                return next(err);
            }
            res.ok(projects);
        });
});

router.post('/', function (req, res, next) {
    validateProject(req.body)
        .then(function (project) {
            Project.create(project, function (err, project) {
                if (err)
                    throw err;
                res.ok(project);
            });
        })
        .catch(function (err) {
            if (err instanceof ValidationError) {
                return res.badRequest(err);
            }
            next(err);
        });
});

router.put('/:projectId', function (req, res, next) {
    var projectUpdates = req.body;

    if (projectUpdates.name) {
        req.project.name = projectUpdates.name;
    }

    if (projectUpdates.color) {
        req.project.color = projectUpdates.color;
    }

    validateProject(req.project)
        .then(function (project) {
            Project.update({
                _id: project._id
            }, {
                name: project.name,
                color: project.color
            }, function (err, project) {
                if (err)
                    throw err;
                res.ok(project);
            });
        })
        .catch(function (err) {
            if (err instanceof ValidationError) {
                return res.badRequest(err);
            }
            next(err);
        });
});

router.delete('/:projectId', function (req, res, next) {
    Q(req.project.remove())
        .then(function () {
            res.ok();
        })
        .catch(next);
});

function validateProject(project) {
    var d = Q.defer();

    var error = new ValidationError();

    if (!project.name) {
        error.addMessage('name', 'required');
    }

    if (!project.color) {
        error.addMessage('color', 'required');
    }

    if (error.hasMessages()) {
        d.reject(error);
        return d.promise;
    }

    var qParams = {
        name: project.name
    };

    if (project._id) {
        qParams._id = {
            $ne: project._id
        };

        project = {
            _id: project._id,
            name: project.name,
            color: project.color
        };
    }

    return Q(Project.count(qParams))
        .then(function (isNameAlreadyExists) {

            if (isNameAlreadyExists) {
                error.addMessage('name', 'alreadyExists');
                throw error;
            }

            return project;
        });
}

router.use('/:projectId/tasks', require('./tasks'));

module.exports = router;
