/**
 * @ngInject
 */
module.exports = function($http) {

    this.todayBadges = [];

    this.getTodayTasks = function() {
        return $http.get('/api/tasks', {
            query: {
                expand: 'project'
            }
        });
    };
};
