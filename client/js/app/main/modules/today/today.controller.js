/**
 * @ngInject
 */
module.exports = function (todayService, $filter, nowValue) {
    var vm = this;
    this.tasks = [];
    this.todayLong = $filter('date')(nowValue, "d MMM yyyy").toLowerCase();

    todayService.getTasks(function (res) {
        vm.tasks = res.data;
    });
};
