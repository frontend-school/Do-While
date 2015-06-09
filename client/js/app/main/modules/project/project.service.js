var addNewProject = require('./createNewProjects.events');

/**
 * @ngInject
 */
module.exports = function ($http, apiConfig, $rootScope) {

    this.addNewProject = function (item) {
        $rootScope.$emit(addNewProject.createdNewProjects, item);
    };

    this.getById = function (id) {
        return $http.get('/api/projects/' + id);
    };

    this.getTasks = function (id) {
        return $http.get(apiConfig.basePath + '/projects/' + id + '/tasks.json');
    };

    this.create = function (project) {
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
