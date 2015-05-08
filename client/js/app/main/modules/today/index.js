var angular = require('angular');

var todayModule = angular.module('todayModule', [
    /* deps */
]).config(require('./today.config'));

module.exports = todayModule.name;