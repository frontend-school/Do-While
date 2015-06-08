/*@ngInject*/
module.exports = function ($scope) {
    var vm = this;

    vm.isLoading = false;

    $scope.$onRootScope('loader:start', function () {
        vm.isLoading = true;
    });

    $scope.$onRootScope('loader:finish', function () {
        vm.isLoading = false;
    });
};