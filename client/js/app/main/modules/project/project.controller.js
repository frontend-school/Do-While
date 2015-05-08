/**
 * @ngInject
 */
module.exports = function ($stateParams, projectService) {
    var vm = this;
    this.tasks = [];

    var id = $stateParams.projectId;

    projectService.getById(id, function (res) {
        var project = res.data;
        vm.color = project.color;
        vm.name = project.name;

        projectService.getTasks(id, function (res) {
            vm.tasks = res.data.items;
        })
    });
};