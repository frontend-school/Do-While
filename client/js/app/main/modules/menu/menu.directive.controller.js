var angular = require('angular'),
    menuEvents = require('./menu.events');

/*
 * @ngInject
 * */
module.exports = function ($scope, todayService) {
    var vm = this,
        todayDate = new Date(),
        todayJSON = todayDate.toJSON().substr(0,10);
    this.isVisible = false;
    this.badges = [];

    $scope.$onRootScope(menuEvents.changeVisibility, function (event, isVisible) {
        if (angular.isUndefined(isVisible)) {
            isVisible = !vm.isVisible;
        }

        vm.isVisible = isVisible;
        event.stopPropagation();
    });

    todayService.getTasks(function (res) {

        var tasks = [],
            badges = [];

        for (var i=0; i<res.data.length; i++){
          if (res.data[i].date.substr(0,10) === todayJSON) {
            tasks.push(res.data[i]);
          }
        }

        angular.forEach(tasks, function(item){
          if (badges.length === 0) {badges.push(item.projectColor);}
          else {
            var status = false;
            for (var prop in badges) {
              if (badges[prop] === item.projectColor) {status = true;}
            }
            if (!status) {badges.push(item.projectColor);}
          }
        });
        vm.badges = badges;
    });
};
