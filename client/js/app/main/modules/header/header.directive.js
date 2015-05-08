/**
 * @ngInject
 * */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            color: '=',
            menuClick: '&'
        },
        controller: require('./header.directive.controller'),
        controllerAs: 'header',
        templateUrl: viewResolver.resolve('header.template.html', __dirname)
    };
};
