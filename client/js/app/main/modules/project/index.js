module.exports = require('angular')
    .module('projectModule', [
        require('./components')
    ])
    .config(require('./project.config'))
    .factory('projectService', require('./project.service'))
    .name;