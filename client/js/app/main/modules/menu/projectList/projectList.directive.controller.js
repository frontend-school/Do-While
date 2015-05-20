/*
 * @ngInject
 * */
module.exports = function (projectsService) {
    var vm = this;
    this.items = [];
    projectsService
        .getAll()
        .then(function (res) {
            console.log(res);
            vm.items = res.data.items;
        });
};