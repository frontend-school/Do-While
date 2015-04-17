var angular = require('angular');

var exampleModule = angular.module('example', [require('../../shared.modules/greet')])
    .controller('ExampleController', require('./example.controller.js'))
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views' + __dirname + '/example.view.html',
            controller: 'ExampleController'
        });
    });
module.exports = exampleModule;