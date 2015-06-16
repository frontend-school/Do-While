module.exports = require('angular')
    .module('createModule', [
    ])
    .directive('dwColorPicker', require('./colorPicker/colorPicker.directive'))
    .factory('projectForm', require('./project.form.js'))
    .config(require('./createProject.config'))
    .name;
