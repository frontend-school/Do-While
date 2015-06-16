/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.createProject', {
        url: '/projects/create',
        controller: require('./createProject.controller'),
        templateUrl: 'createProject.view.html'
    });
};
