var angular = require('angular');

var viewResolverModule = angular.module('viewResolverModule', [])
        .provider('viewResolver', require('./viewResolver.provider.js'));

module.exports = viewResolverModule.name;