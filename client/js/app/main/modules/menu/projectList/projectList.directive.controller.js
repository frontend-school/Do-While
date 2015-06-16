var projectEvents = require('../../project/project.events');

/*
 * @ngInject
 * */
module.exports = function (projectService, $rootScope) {
    var vm = this;
    vm.items = [];

    $rootScope.$on(projectEvents.changed, function () {
        update();
    });

    update();

    function update() {
        projectService
            .getAll()
            .then(function (response) {
                vm.items = response;
            });
    }
};
