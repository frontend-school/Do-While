/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        required: '^dwTaskList',
        replace: true,
        transclude: true,
        scope: {
            task: '='
        },
        controller: require('./taskItem.directive.controller'),
        controllerAs: 'taskCtrl',
        templateUrl: viewResolver.resolve('taskItem.template.html', __dirname)
    }
};