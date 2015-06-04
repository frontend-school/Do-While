/**@ngInject*/
module.exports = function ($stateProvider) {
    $stateProvider.state('main.createTask', {
        url: '/tasks/create',
        templateUrl: 'createTask.view.html'
    });
};
