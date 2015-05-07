var angular = require('angular');

var headerModule = angular.module('headerModule', ['commonModule'])
    .controller('HeaderCtrl', require('./header.controller.js'))
    .directive("dwHeaderBlock", require('./dw-header-block.directive.js'));

module.exports = headerModule;
