/**
 * @ngInject
 */
module.exports = function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            model: '=',
            onSubmit: "@",
            onReset: "@"
        },
        templateUrl: 'projectForm.template.html'
    };
};
