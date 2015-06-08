module.exports = require('angular')
    .module('loaderModule', [])
    .directive('dwLoader', require('./loader.directive'))
    .factory('loaderService', require('./loader.service'))
    .factory('loaderEventManager', require('./loaderEventManager.service.js'))
    .constant('loaderConfig', {
        delay: 300,
        freeze: 700
    })
    .config(require('./loader.config'))
    .name;