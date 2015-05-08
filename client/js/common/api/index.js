var angular = require('angular');

var apiModule = angular.module('apiModule',[])
    .constant('apiConfig', require('../../app.config.json').api);

module.exports = apiModule.name;