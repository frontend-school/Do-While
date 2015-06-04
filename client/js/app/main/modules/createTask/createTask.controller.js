/**
 * @ng-Inject
 */
module.exports = function ($scope) {

  $scope.submitted = false;
  $scope.projects = [
    {name: 'education', color: 'green'},
    {name: 'work', color: 'blue'},
    {name: 'home', color: 'red'},
    {name: 'study', color: 'orange'},
    {name: 'health', color: 'violet'},
  ];
  $scope.selection = {
    id: ''
  };
  $scope.$watch($scope.selection.id, function () {
    console.log($scope.selection);
  });
  /*$scope.submitted = false;
  $scope.addNewProject = function(){
      projectService
          .create($scope);

      alert('Project "'+$scope.name+'" with "' + $scope.color + '" color was added!');
      $scope.name = null;
      $scope.color = null;
      $scope.submitted = false;
      $scope.createProject.$pristine = true;
  };*/
};
