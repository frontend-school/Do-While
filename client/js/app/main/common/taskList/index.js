var angular = require('angular');

var taskListModule = angular.module('taskListModule', [])
    .directive('dwTaskList', require('./taskList.directive'))
    .directive('dwTaskItem', require('./taskItem.directive.js'));

module.exports = taskListModule.name;