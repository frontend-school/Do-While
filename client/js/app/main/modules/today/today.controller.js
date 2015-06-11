/**
 * @ngInject
 */
module.exports = function(todayService) {
  var vm = this;

  vm.todayDate = new Date();
  vm.tasks = [];

  todayService.getTodayTasks().then(function(res) {
    vm.tasks = res.data.data;
  });
};
