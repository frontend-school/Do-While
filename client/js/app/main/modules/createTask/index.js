module.exports = require('angular')
  .module('createTaskModule', [
    require('./validateTask')
  ])
  .config(require('./createTask.config.js'))
  .name;
