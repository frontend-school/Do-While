module.exports = require('angular')
  .module('createTaskModule', [
    require('./validateTask'),
  ])
  .directive('dwTaskHeader', require('./header/taskHeader.directive'))
  .config(require('./createTask.config.js'))
  .name;
