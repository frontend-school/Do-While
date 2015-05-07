var angular = require('angular');

var commonModule = angular.module('commonModule', [])
    .factory('GlobalData', require('./global-data.service.js'));

module.exports = commonModule;
