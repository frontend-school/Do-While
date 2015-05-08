var angular = require('angular');

var coreModule = angular.module('coreModule', [])
    .config(require('./core.config.js'));

module.exports = coreModule.name;