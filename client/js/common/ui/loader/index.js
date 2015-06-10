module.exports = require('angular')
    .module('loaderModule', [])
    .directive('dwLoader', require('./loader.directive'))
    .factory('loaderService', require('./loader.service'))
    .constant('loaderConfig', {
        threshold: 250,
        release: 1000
    })
    .config(require('./loader.config'))
    .name;