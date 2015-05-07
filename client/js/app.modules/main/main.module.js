var angular = require('angular');

var mainModule = angular.module('mainModule', ['commonModule'])
    .controller('MainCtrl', require('./main.controller.js'));


module.exports = mainModule;
