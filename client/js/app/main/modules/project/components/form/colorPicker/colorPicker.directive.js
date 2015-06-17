/*@ngInject*/
module.exports = function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            selectedColor: '=selected'
        },
        bindToController: true,
        controller: require('./colorPicker.directive.controller.js'),
        controllerAs: 'colorPicker',
        templateUrl: 'colorPicker.template.html'
    };
};