/*@ngInject*/
module.exports = function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controller: require('./loader.directive.ctrl'),
        controllerAs: 'loader',
        templateUrl: 'loader.tpl.html'
    };
};