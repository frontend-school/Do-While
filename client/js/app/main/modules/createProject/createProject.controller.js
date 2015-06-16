var angular = require('angular');

/*
 * @ngInject
 * */
module.exports = function (projectService) {
    var vm = this;

    angular.extend(vm, {
        input: {
            name: '',
            color: null
        }
    });

    vm.submit = function (form) {
        console.log(form);
    };

    vm.reset = function (form) {
        console.log(form);
    };
};
