module.exports = require('angular')
    .module('projectForm', [])
    .directive('dwColorPicker', require('./form/colorPicker/colorPicker.directive'))
    .directive('dwProjectForm', require('./form/project.form.directive'))
    .directive('dwProjectTaskItem', require('./taskItem/projectTaskItem.directive'))
    .factory('projectForm', require('./form/project.form'))
    .name;