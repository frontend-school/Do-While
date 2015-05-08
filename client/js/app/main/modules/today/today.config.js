/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('main.today', {
        url: '/today',
        templateUrl: {
            root: __dirname,
            name: 'today.view.html'
        }
    });
};