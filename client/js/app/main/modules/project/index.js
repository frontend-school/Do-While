var angular = require('angular');

var projectModule = angular.module('projectModule', [])
    .service('projectService', require('./project.service'))
    .directive('dwProjectTaskItem', require('./projectTaskItem.directive'))
    .config(require('./project.config.js'));

module.exports = projectModule.name;