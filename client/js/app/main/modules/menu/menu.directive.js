/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        controller: require('./menu.directive.controller'),
        controllerAs: 'menu',
        templateUrl: viewResolver.resolve('menu.template.html', __dirname)
    };
};