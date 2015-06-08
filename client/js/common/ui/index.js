module.exports = require('angular')
    .module('uiModule', [
        require('./loader')
    ])
    .directive('dwColor', require('./color.directive'))
    .name;