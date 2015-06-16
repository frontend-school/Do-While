var angular = require('angular');
/**
 * @ngInject
 */
module.exports = function ($stateParams, projectService) {
    var vm = this;

    angular.extend(vm, {
        name: '',
        color: '',
        tasks: []
    });

    projectService
        .getById($stateParams.projectId, true)
        .then(function (project) {
            vm.color = project.color;
            vm.name = project.name;
            vm.tasks = project.tasks;
        });
};
