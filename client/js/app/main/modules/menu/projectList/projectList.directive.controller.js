var addNewProject = require('../../project/createNewProjects.events');

/*
 * @ngInject
 * */
module.exports = function (projectService, $rootScope) {
    var vm = this;
    this.items = [];
    projectService
      .getAllProjects()
      .then(function (res) {
          vm.items = res.data.items;
      });

    $rootScope.$on(addNewProject.createdNewProjects, function (event, project) {
      vm.items.push(project);
    });
};
