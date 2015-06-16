module.exports = require('angular')
    .module('createModule', [
    ])
    .directive('dwColorPicker', require('./colorPicker/colorPicker.directive'))
    .config(require('./createProject.config'))
    .name;
