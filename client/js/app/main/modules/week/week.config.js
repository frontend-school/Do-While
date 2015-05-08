/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.week', {
        url: '/week',
        templateUrl: {
            root: __dirname,
            name: 'week.view.html'
        }
    });
};