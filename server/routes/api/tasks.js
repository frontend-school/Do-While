var express = require('express'),
  router = express.Router(),
  Project = require('../../models/projects'),
  Tasks = require('../../models/tasks');

router.get('/', function(req, res) {

  var todayDate, startDate, endDate, projectIds;

  todayDate = new Date();

  startDate = new Date(todayDate);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  endDate = new Date(todayDate);
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);

  Tasks.find({
    date: {
      $gte: startDate,
      $lt: endDate
    }
  }, function(err, findedTasks) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    projectIds = findedTasks.map(function(item) {
      return item.projectId;
    });

    var arrayModifyedTasks = [];

    Project.find({
      _id: {
        $in: projectIds
      }
    }, function(err, data) {

        var modifyedTask;
        findedTasks.forEach(function(item) {
          modifyedTask = {
            project: {}
          };
          modifyedTask._id = item._id;
          modifyedTask.accessTime = item.accessTime;
          modifyedTask.date = item.date;
          modifyedTask.isReady = item.isReady;
          modifyedTask.name = item.name;
          modifyedTask.notificationTime = item.notificationTime;
          modifyedTask.project._id = item.projectId;

          for (var j = 0; j < data.length; j++) {
            if (item.projectId == data[j]._id) {
              modifyedTask.project.color = data[j].color;
              modifyedTask.project.name = data[j].name;
            }
          }

          arrayModifyedTasks.push(modifyedTask);
        });

        res.json({
          data: arrayModifyedTasks
        });

    });

  });

});

router.get('/week', function(req, res) {

  var todayDate, startDate, endDate, projectIds;

  todayDate = new Date();

  startDate = new Date(todayDate);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  endDate = new Date(todayDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);

  Tasks.find({
    date: {
      $gte: startDate,
      $lt: endDate
    }
  }, function(err, findedTasks) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    projectIds = findedTasks.map(function(item) {
      return item.projectId;
    });

    var arrayModifyedTasks = [];

    Project.find({
      _id: {
        $in: projectIds
      }
    }, function(err, data) {

        var modifyedTask;
        findedTasks.forEach(function(item) {
          modifyedTask = {
            project: {}
          };
          modifyedTask._id = item._id;
          modifyedTask.accessTime = item.accessTime;
          modifyedTask.date = item.date;
          modifyedTask.isReady = item.isReady;
          modifyedTask.name = item.name;
          modifyedTask.notificationTime = item.notificationTime;
          modifyedTask.project._id = item.projectId;

          for (var j = 0; j < data.length; j++) {
            if (item.projectId == data[j]._id) {
              modifyedTask.project.color = data[j].color;
              modifyedTask.project.name = data[j].name;
            }
          }

          arrayModifyedTasks.push(modifyedTask);
        });

        res.json({
          data: arrayModifyedTasks
        });

    });

  });

});

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
    date: req.body.date,
    notificationTime: '',
    accessTime: '',
    isReady: false
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
