var angular = require('angular');

var validateProjectModule = angular.module('validateProjectModule', [])
    .directive('dwValidateProject', require('./validateProject.directive'));

module.exports = validateProjectModule.name;
