/*
 * @ngInject
 * */
module.exports = function ($scope, projectService) {

  $scope.submitted = false;
  $scope.requestMessage = '';
  $scope.requestStatus = '';

  $scope.Colors = [
    {color: "yellow"},
    {color: "olive"},
    {color: "orange"},
    {color: "maroon"},
    {color: "red"},
    {color: "magenta"},
    {color: "violet"},
    {color: "purple"},
    {color: "blue"},
    {color: "cyan"},
    {color: "green"},
    {color: "green-yellow"}
  ];

  $scope.checkProjects = function () {

    projectService.createProject({
      name: $scope.name,
      color: $scope.color
    }).then(function(res) {
      $scope.requestStatus = res.data.status;
      if ($scope.requestStatus === 'success') {
        projectService.newProjectAdded(res.data.data);
        $scope.reset();
        $scope.requestMessage = '';
      } else {
        $scope.requestMessage = res.data.message;
      }
    });
  };

  $scope.chooseColor = function (item) {
    $scope.color = item;
  };

  $scope.isColorSelected = function (item) {
    return item === $scope.color;
  };

  $scope.verifyColor = function () {
    return ($scope.color === undefined) && $scope.submitted;
  };

  $scope.verifyName = function () {
    return $scope.submitted && $scope.createProject.projectName.$invalid;
  };

  $scope.reset = function () {
    $scope.submitted = false;
    $scope.name = '';
    $scope.requestMessage = '';
    $scope.createProject.$pristine = true;
    $scope.createProject.projectName.$invalid = true;
    delete $scope.color;
  };

  $scope.isSubmitDisabled = function () {
    return ($scope.verifyColor() && !$scope.createProject.$pristine && $scope.createProject.$invalid);
  };

  $scope.submit = function () {
    $scope.submitted = true;
    $scope.createProject.$pristine = false;

    !($scope.color === undefined) && $scope.createProject.$valid && $scope.checkProjects();
  };

};
