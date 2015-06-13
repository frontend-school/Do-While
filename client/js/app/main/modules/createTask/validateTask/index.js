var angular = require('angular');

var validateTaskModule = angular.module('validateTaskModule', [])
    .directive('dwValidateTask', require('./validateTask.directive'));

module.exports = validateTaskModule.name;
