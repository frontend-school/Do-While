/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.createProject', {
        url: '/projects/create',
        templateUrl: 'createProject.view.html',
        controller: 'createProjectCtrl',
        controllerAs: 'ctrl'
    });
};
