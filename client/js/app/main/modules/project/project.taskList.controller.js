var angular = require('angular');
/**
 * @ngInject
 */
module.exports = function ($stateParams, project) {
    var vm = this;
    angular.extend(vm, project)
};
