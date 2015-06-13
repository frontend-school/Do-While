/**
 * @ngInject
 */
module.exports = function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {},
        controller: require('./validateTask.directive.controller'),
        templateUrl: 'validateTask.view.html'
    };
};
