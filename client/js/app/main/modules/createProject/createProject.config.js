/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.createProject', {
        url: '/projects/create',
        controller: require('./createProject.controller'),
        controllerAs: 'project',
        templateUrl: 'createProject.view.html'
    });
};
