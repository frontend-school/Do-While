/**
 * @ngInject
 */
module.exports = function (menuService) {
    var vm = this;

    this.toggleMenuVisibility = menuService.toggleVisibility;
};