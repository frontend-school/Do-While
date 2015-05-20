var angular = require('angular');

var createModule = angular.module('createModule', [])
    .controller('createCtrl', require('./createProject.controller'))
    .service('createService', require('./createProject.service'))
    .config(require('./createProject.config'));

module.exports = createModule.name;