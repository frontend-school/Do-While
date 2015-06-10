var project = require('./project.events');

/**
 * @ngInject
 */
module.exports = function ($http, apiConfig, $rootScope) {

    this.newProjectAdded = function (item) {
        $rootScope.$emit(project.create, item);
    };

    this.getById = function (id) {
        return $http.get('/api/projects/' + id);
    };

    this.getTasks = function (id) {
        return $http.get(apiConfig.basePath + '/projects/' + id + '/tasks.json');
    };

    this.createProject = function (project) {
        return $http.post('/api/projects', { name: project.name, color: project.color });
    };

    this.createTask = function (project) {
        return $http.post('/api/tasks', {
                    projectId: project.projectId,
                    name: project.name,
                    date: project.date,
                    notificationTime: project.notificationTime,
                    accessTime: project.accessTime
                });
    };

    this.getAllProjects = function () {
        return $http.get('/api/projects');
    };
};
