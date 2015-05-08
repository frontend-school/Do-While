var angular = require('angular');

var weekModule = angular.module('weekModule', [
    /* deps */
]).config(require('./week.config'));

module.exports = weekModule.name;