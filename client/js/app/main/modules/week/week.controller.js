/**
 * @ngInject
 */
module.exports = function(weekService, $location, $anchorScroll, $filter) {
  var vm = this,
    dateFilter = $filter('date');

  weekService.getWeekTasks().then(function(weekTasks) {
    vm.weekTasks = weekService.groupTasksByDay(weekTasks.data.data);
  });

  vm.todayDate = new Date();

  vm.goToDate = function(date) {
    var newHash = dateFilter(date, 'dm');
    if ($location.hash() !== newHash) {
      $location.hash(newHash);
    } else {
      $anchorScroll();
    }
  };
};
