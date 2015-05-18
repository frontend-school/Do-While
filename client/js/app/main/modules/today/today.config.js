/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.today', {
        url: '/today',
        controller: require('./today.controller'),
        controllerAs: 'today',
        templateUrl: {
            root: __dirname,
            name: 'today.view.html'
        }
    });
};
