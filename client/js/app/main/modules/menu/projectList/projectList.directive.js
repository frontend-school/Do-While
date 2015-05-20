/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        controller: require('./projectList.directive.controller'),
        controllerAs: 'projectList',
        templateUrl: viewResolver.resolve('projectList.template.html', __dirname)
    };
};