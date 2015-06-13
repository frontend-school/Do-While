/**
 * @ngInject
 */
module.exports = function(todayService) {
  var vm = this;

  vm.todayDate = new Date();
  vm.tasks = [];

  todayService.getTodayTasks().then(function(res) {
    vm.tasks = res.data.data;

    todayService.todayBadges = vm.tasks.reduce(function (colors, task) {
        function hasColor(color) {
            for (var i = 0; i < colors.length; i++) {
              if (colors[i] === color) {
                return true;
              }
            }
            return false;
        }

        if (!hasColor(task.project.color)) {
          colors.push(task.project.color);
        }

        return colors;
    }, todayService.todayBadges);
  });
};
