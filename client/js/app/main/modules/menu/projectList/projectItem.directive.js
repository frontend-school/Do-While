/**
 * @ngInject
 */
module.exports = function (viewResolver) {
    return {
        restrict: 'E',
        required: '^dwProjectList',
        replace: true,
        transclude: true,
        scope: {
            project: '='
        },
        templateUrl: viewResolver.resolve('projectItem.template.html', __dirname)
    }
};