var angular = require('angular');

var mainModule = angular.module('mainModule', [])
    .controller('mainCtrl', require('./main.controller.js'))
    .directive("ngHeaderBlock", require('./ng-header-block.directive.js'))
    .factory('mainPageInfo', require('./main-page-info.factory.js'));

module.exports = mainModule;
