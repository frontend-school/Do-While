var angular = require('angular');

var greetModule = angular.module('greet', [])
    .filter('hello', require('./greet.filter'));

module.exports = greetModule;