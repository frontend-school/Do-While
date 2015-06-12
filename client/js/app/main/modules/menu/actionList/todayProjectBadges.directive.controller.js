/**
 * @ngInject
 */
module.exports = function (todayService) {
    var vm = this;
    vm.colors = todayService.todayBadges;
};
