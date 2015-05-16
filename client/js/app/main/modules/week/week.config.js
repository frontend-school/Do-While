/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.week', {
        url: '/week',
        controller: require('./week.controller'),
        controllerAs: 'week',
        templateUrl: {
            root: __dirname,
            name: 'week.view.html'
        }
    });
};
