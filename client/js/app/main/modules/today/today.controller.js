/**
 * @ngInject
 */
module.exports = function(todayService) {
  var vm = this;

  vm.todayDate = new Date();
  vm.tasks = [];

  todayService.getTodayTasks().success(function(tasks) {
    vm.tasks = tasks;
  });
};
