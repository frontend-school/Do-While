var project = require('../../project/project.events');

/*
 * @ngInject
 * */
module.exports = function (projectService, $rootScope) {
    var vm = this;
    vm.items = [];

    projectService
      .getAllProjects()
      .then(function (res) {
          vm.items = res.data;
          projectService.projects = vm.items;
      });

    vm.resetProjectId = function () {
      projectService.editedProject.id = '';
      projectService.editedProject.name = '';
      projectService.editedProject.color = '';
    };

    $rootScope.$on(project.create, function (event, project) {
      vm.items.push(project);
      projectService.projects = vm.items;
    });

    $rootScope.$on(project.edit, function (event, project) {
      vm.items.forEach(function (item) {
        if (item._id === project._id) {
          item.name = project.name;
          item.color = project.color;
        }
      });
      projectService.projects = vm.items;
    });
};
