/*@ngInject*/
module.exports = function (loaderService) {
    var vm = this;

    vm.isLoading = loaderService.isLoading;
};