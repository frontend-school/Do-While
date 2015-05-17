var angular = require('angular');

var mainModuleDependencies = []
    .concat(require('./common'))
    .concat(require('./modules'));

var mainModule = angular.module('mainModule', mainModuleDependencies)
    .config(require('./main.config'));

module.exports = mainModule.name;
