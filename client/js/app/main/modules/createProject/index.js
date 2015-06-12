var angular = require('angular');

var createModule = angular.module('createModule', [
    require('./validateProject'),
  ])
    .config(require('./createProject.config'));

module.exports = createModule.name;
