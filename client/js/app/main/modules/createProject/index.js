module.exports = require('angular')
    .module('createModule', [
    ])
    .directive('dwProjectForm', require('./projectForm/projectForm.directive'))
    .directive('dwColorPicker', require('./colorPicker/colorPicker.directive'))
    .config(require('./createProject.config'))
    .name;
