/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        required: '^dwTaskList',
        replace: false,
        transclude: false,
        templateUrl: viewResolver.resolve('projectTaskItem.template.html', __dirname)
    }
};