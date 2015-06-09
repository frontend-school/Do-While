module.exports = require('angular')
    .module('loaderModule', [])
    .directive('dwLoader', require('./loader.directive'))
    .factory('loaderService', require('./loader.service'))
    .constant('loaderConfig', {
        threshold: 300,
        release: 700
    })
    .config(require('./loader.config'))
    .name;