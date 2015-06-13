module.exports = require('angular')
  .module('weekModule', [
    require('./weekCalendar')
  ])
  .service('weekService', require('./week.service'))
  .config(require('./week.config'))
  .name;
