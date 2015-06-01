/*
 * @ngInject
 * */
module.exports = function (projectService) {
    var vm = this;
    this.items = [];
    projectService
        .getAllProjects()
        .then(function (res) {
            console.log(res);
            vm.items = res.data.items;
        });
};