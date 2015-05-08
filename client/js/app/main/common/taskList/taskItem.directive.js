/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        required: '^dwTaskList',
        replace: true,
        transclude: true,
        templateUrl: viewResolver.resolve('taskItem.template.html', __dirname)
    }
};