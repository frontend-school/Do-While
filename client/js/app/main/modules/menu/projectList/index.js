var angular = require('angular');

var projectListModule = angular.module('projectListModule', [])
    .directive('dwProjectList', require('./projectList.directive'))
    .directive('dwProjectItem', require('./projectItem.directive'))
    .service('projectsService', require('./projects.service'));

module.exports = projectListModule.name;