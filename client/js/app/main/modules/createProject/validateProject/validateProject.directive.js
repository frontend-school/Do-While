/**
 * @ngInject
 */
module.exports = function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {},
        controller: require('./validateProject.directive.controller'),
        templateUrl: 'validateProject.view.html'
    };
};
