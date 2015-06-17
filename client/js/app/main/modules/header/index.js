var angular = require('angular');

var headerModule = angular.module('headerModule', [])
    .directive('dwHeader', require('./header.directive'))
    .directive('dwFormHeader', require('./formHeader/formHeader.directive'));

module.exports = headerModule.name;