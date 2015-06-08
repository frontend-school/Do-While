module.exports = require('angular')
    .module('loaderModule', [])
    .factory('loaderService', require('./loader.service'))
    .factory('loaderEventManager', require('./loaderEventManager.service.js'))
    .constant('loaderConfig', {
        delay: 300,
        freeze: 1000
    })
    .config(require('./loader.config'))
    .name;