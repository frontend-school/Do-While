/**
 * @ngInject
 */
module.exports = function ($http, apiConfig, calendarService) {

    this.getTodayTasks = function () {
        return $http.get('/api/tasks');
    };

    /*this.getAllTasks = function (config) {
        return $http.get(apiConfig.basePath + '/tasks.json', config);
    };*/

    /*this.getTodayTasks = function () {
        var date = new Date(); // "2015-05-17" as example can be used
        return this.getAllTasks({
            transformResponse: appendTransform($http.defaults.transformResponse, function (tasks) {
                tasks =  mapDate(tasks);
                return tasks;
                // tasks = mapDate(tasks);
                // return filterByDate(tasks, date);
            })
        });
    };*/

    /*this.getWeekTasks = function () {
        var todayDate = new Date();

        return this.getAllTasks({
            transformResponse: appendTransform($http.defaults.transformResponse, function (tasks) {
                tasks = mapDate(tasks);
                return groupTasksByDay(tasks);
            })
        });
    };*/

    function appendTransform(defaults, transform) {
        defaults = angular.isArray(defaults) ? defaults : [defaults];
        return defaults.concat(transform);
    }

    function groupTasksByDay(tasks) {
        return calendarService.getNextDaysForWeek()
            .reduce(function (dayTasks, date) {
                dayTasks.push({
                    date: date,
                    tasks: filterByDate(tasks, date)
                });
                return dayTasks;
            }, []);
    }

    function mapDate(tasks) {
        return tasks.map(function (task) {
            task.date = new Date(task.date);
            return task;
        });
    }

    function filterByDate(tasks, date) {
        return tasks.reduce(function (todayTasks, task) {
            if (calendarService.isDateEquals(task.date, date))
                todayTasks.push(task);
            return todayTasks;
        }, []);
    }
};
