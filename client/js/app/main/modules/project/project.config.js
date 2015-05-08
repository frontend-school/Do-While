/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.project', {
        url: '/projects/{projectId:[0-9a-fA-F]{1,8}}',
        controller: require('./project.controller'),
        controllerAs: 'project',
        templateUrl: {
            root: __dirname,
            name: 'project.view.html'
        }
    });
};