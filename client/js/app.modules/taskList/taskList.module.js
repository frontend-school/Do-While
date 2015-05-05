var angular = require('angular');

var taskListModule = angular.module('taskList', ['ngRoute'])
    .controller('taskListController', require('./taskList.controller.js'))
    .config(function ($routeProvider) {
        $routeProvider
        .when('/today.html', {
            templateUrl: '/views' + __dirname + '/today.html',
            controller: 'taskListController',
            view: 'Content'
        })
        // .when('/week.html', {
        //   templateUrl: '/views' + __dirname + '/week.html',
        //   controller: 'taskListController',
        //   view: 'Content'
        // });
    });
module.exports = taskListModule;
