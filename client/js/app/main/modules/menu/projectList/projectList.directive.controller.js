var project = require('../../project/project.events');

/*
 * @ngInject
 * */
module.exports = function (projectService, $rootScope) {
    var vm = this;
    this.items = [];
    projectService
      .getAllProjects()
      .then(function (res) {
          vm.items = res.data;
      });

    $rootScope.$on(project.create, function (event, project) {
      vm.items.push(project);
    });
};
