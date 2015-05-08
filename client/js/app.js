var angular = require('angular');

var appDependencies = []
    .concat(require('./common'))
    .concat(require('./vendor'))
    .concat(require('./app/index'));

angular.module('doWhileApp', appDependencies);