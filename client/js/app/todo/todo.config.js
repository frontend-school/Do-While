/**
 * @ngInject
 */
module.exports = function ($stateProvider) {
    $stateProvider.state('todo', {
        url: '/todo',
        templateUrl: {
            root: __dirname,
            name: 'todo.view.html'
        }
    });
};