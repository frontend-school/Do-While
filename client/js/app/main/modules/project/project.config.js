/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider
        .state('main.project', {
            url: '/projects/{projectId:[0-9a-fA-F]{1,8}}',
            resolve: {
                project: resolveProjectWithTasks
            },
            controller: require('./project.taskList.controller'),
            controllerAs: 'project',
            templateUrl: 'project.taskList.view.html'
        })
        .state('main.createProject', {
            url: '/projects/create',
            controller: require('./project.create.controller'),
            templateUrl: 'project.form.view.html'
        })
        .state('main.editProject', {
            url: '/projects/{projectId:[0-9a-fA-F]{1,8}}/edit',
            resolve: {
                project: resolveProject
            },
            controller: require('./project.edit.controller'),
            templateUrl: 'project.form.view.html'
        });

    /*@ngInject*/
    function resolveProject($stateParams, projectService) {
        return projectService.getById($stateParams.projectId);
    }

    /*@ngInject*/
    function resolveProjectWithTasks($stateParams, projectService) {
        return projectService.getById($stateParams.projectId, true);
    }
};