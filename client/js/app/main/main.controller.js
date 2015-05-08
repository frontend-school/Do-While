/**
 * @ngInject
 * */
module.exports = function ($scope, menuService) {
    var vm = this;
    this.toggleMenuVisibility = menuService.toggleVisibility;
    $scope.$onRootScope('$stateChangeSuccess', menuService.hide);
};