/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main', {
        abstract: true,
        controller: require('./main.controller'),
        controllerAs: 'page',
        templateUrl: {
            root: __dirname,
            name: 'main.view.html'
        }
    });
};