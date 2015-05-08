var angular = require('angular');

var exampleModule = angular.module('example', [])
    .config(require('./todo.config'));

module.exports = exampleModule.name;