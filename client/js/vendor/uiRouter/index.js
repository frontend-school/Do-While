var angular = require('angular');

var uiRouterModule = angular.module(require('ui-router'))
    .config(require('./uiRouter.config'));

module.exports = uiRouterModule.name;