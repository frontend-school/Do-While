var angular = require('angular');

var todayModule = angular.module('todayModule', [])
    .service('todayService', require('./today.service'))
    .directive('dwTodayTaskItem', require('./todayTaskItem.directive'))
    .config(require('./today.config.js'));

module.exports = todayModule.name;
