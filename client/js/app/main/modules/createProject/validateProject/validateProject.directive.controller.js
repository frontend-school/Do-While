/*
 * @ngInject
 * */
module.exports = function ($scope, projectService) {

  $scope.submitted = false;
  $scope.requestMessage = '';
  $scope.requestStatus = '';
  $scope.name = projectService.editedProject.name;
  $scope.color = projectService.editedProject.color;

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

    if (projectService.editedProject.id) {
      projectService.editProject({
        id: projectService.editedProject.id,
        name: $scope.name,
        color: $scope.color
      }).then(function(res) {
        requestHandler(res, projectService.projectEdited);
      });
    } else {
      projectService.createProject({
        name: $scope.name,
        color: $scope.color
      }).then(function(res) {
        requestHandler(res, projectService.newProjectAdded);
      });
    }
  };

  function requestHandler(arg, func) {
    $scope.requestStatus = arg.data.status;
    if ($scope.requestStatus === 'success') {
      func(arg.data.data);
      $scope.reset();
      $scope.requestMessage = '';
    } else {
      $scope.requestMessage = arg.data.message;
    }
  }

  $scope.chooseColor = function (item) {
    $scope.color = item;
  };

  $scope.isColorSelected = function (item) {
    return item === $scope.color;
  };

  $scope.verifyColor = function () {
    return ($scope.color === undefined) && $scope.submitted;
  };

  $scope.verifyProjectName = function () {
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
