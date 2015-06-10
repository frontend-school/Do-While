/**
 * @ngInject
 */
module.exports = function ($stateParams, projectService) {
    var vm = this;
    vm.tasks = [];

    var id = $stateParams.projectId;

    projectService.getById(id)
        .success(function (project) {
            vm.color = project.data.color;
            vm.name = project.data.name;
            vm.tasks = project.data.tasks;
        });
};
