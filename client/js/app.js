var angular = require('angular');

var appDependencies = [require('angular-route')].concat(require('./app.modules'));

angular.module('doWhileApp', appDependencies);
