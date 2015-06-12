/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.createProject', {
        url: '/projects/create',
        templateUrl: 'createProject.view.html',
    }).state('main.editProject', {
      url: '/projects/edit',
      templateUrl: 'editProject.view.html',
    });
};
