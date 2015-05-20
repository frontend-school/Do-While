/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.createProject', {
        url: '/projects/create',
        templateUrl: {
            root: __dirname,
            name: 'createProject.view.html'
        }
    });
};