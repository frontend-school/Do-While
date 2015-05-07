var angular = require('angular');

var menuModule = angular.module('menuModule', ['commonModule'])
    .controller('MenuCtrl', require('./menu.controller.js'));


module.exports = menuModule;
