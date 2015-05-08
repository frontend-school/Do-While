var angular = require('angular');

var headerModule = angular.module('headerModule', [])
    .directive('dwHeader', require('./header.directive'));

module.exports = headerModule.name;