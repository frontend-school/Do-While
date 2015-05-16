/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        required: '^dwTaskList',
        replace: false,
        transclude: false,
        templateUrl: viewResolver.resolve('weekTaskItem.template.html', __dirname)
    };
};
