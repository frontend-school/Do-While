/**
 * @ng-Inject
 */
module.exports = function ($scope, projectService) {

  $scope.submitted = false;
  $scope.projects = [
    {name: 'education', color: 'green'},
    {name: 'work', color: 'blue'},
    {name: 'home', color: 'red'},
    {name: 'study', color: 'orange'},
    {name: 'health', color: 'violet'}
  ];
  $scope.selection = {
    id: ''
  };
  $scope.$watch($scope.selection.id, function () {
    console.log($scope.selection);
  });

  $scope.setTaskDate = '';
  $scope.requestStatus = '';

  $scope.setTodayDate = function () {
    $scope.setTaskDate = new Date();
    console.log($scope.setTaskDate);
  };

  $scope.setTomorrowDate = function () {
    var d = new Date();
    $scope.setTaskDate = new Date(d.valueOf() + 24*60*60*1000);
    console.log($scope.setTaskDate);
  };

  $scope.setDate = function () {
    console.log('I don\'t do anything yet');
  };

  $scope.sendTask = function () {
    projectService.createTask({
      project: $scope.project,
      name: $scope.name,
      date: $scope.setTaskDate.toJSON()
    }).then(function(res) {
      console.log(res);
    });
  };
};
