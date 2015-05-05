/**
 * @ngInject
 * */
module.exports = ['$scope', '$http', '$filter', function ($scope, $http, $filter){
    $http
      .get('data.json')
      .success(function(data){
        $scope.items = data;
      });

    $scope.isNavHide = true;

    var day = new Date();
    $scope.todayLong = $filter('date')(day, "d MMM yyyy").toLowerCase();
    $scope.todayShort = $filter('date')(day, "dd MMM").toLowerCase();

    $scope.todayFilter = function(todayTask){
      return todayTask.date === $scope.todayLong;
    };

    $scope.todayBadges = function() {
      var badges = [];
      angular.forEach($scope.items, function(item){
        if (item.project_color != false && item.date === $scope.todayLong){
          if (badges.length === 0) {badges.push(item.project_color);}
          else {
            var status = false;
            for (var prop in badges) {
              if (badges[prop] === item.project_color) {status = true;}
            }
            if (!status) {badges.push(item.project_color);}
          }
        }
      });
      return badges;
    };
}];
