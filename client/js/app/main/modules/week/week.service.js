/**
 * @ngInject
 */
module.exports = function($http, calendarService) {

  this.getWeekTasks = function() {
    return $http.get('/api/tasks/week');
  };

  this.groupTasksByDay = function(tasks) {
    return calendarService.getNextDaysForWeek()
      .reduce(function(dayTasks, date) {
        dayTasks.push({
          date: date,
          tasks: filterByDate(tasks, date)
        });
        return dayTasks;
      }, []);
  };

  function filterByDate(tasks, date) {
    return tasks.reduce(function(todayTasks, task) {
      if (calendarService.isDateEquals(task.date, date)) {
        todayTasks.push(task);
      }
      return todayTasks;
    }, []);
  }
};
