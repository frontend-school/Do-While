var menuEvents = require('./menu.events');

/*
 * @ngInject
 * */
module.exports = function ($rootScope) {

    this.show = function () {
        $rootScope.$emit(menuEvents.changeVisibility, true);
    };

    this.hide = function () {
        $rootScope.$emit(menuEvents.changeVisibility, false);
    };

    this.toggleVisibility = function () {
        $rootScope.$emit(menuEvents.changeVisibility);
    };
};