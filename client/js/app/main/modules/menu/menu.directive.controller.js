var angular = require('angular'),
    menuEvents = require('./menu.events');

/*
 * @ngInject
 * */
module.exports = function ($scope) {
    var vm = this;
    this.isVisible = false;

    $scope.$onRootScope(menuEvents.changeVisibility, function (event, isVisible) {
        if (angular.isUndefined(isVisible))
            isVisible = !vm.isVisible;

        vm.isVisible = isVisible;
        event.stopPropagation();
    });

};
