/**
 * @ng-Inject
 */
module.exports = function($scope, projectService) {

  $scope.submitted = false;
  $scope.requestMessage = '';
  $scope.requestStatus = '';
  $scope.selectProject = '';
  $scope.setTaskDate = '';
  $scope.projects = projectService.projects;

  $scope.sendTask = function() {

    var projectId;
    $scope.projects.forEach(function(item) {
      if ($scope.selectProject === item.name) {
        projectId = item._id;
      }
    });
    projectService.createTask({
      projectId: projectId,
      name: $scope.name,
      date: $scope.setTaskDate
    }).then(function(res) {
      $scope.requestStatus = res.data.status;
      if ($scope.requestStatus === 'success') {
        // projectService.newProjectAdded(res.data.data);
        // $scope.reset();
        // $scope.requestMessage = '';
      } else {
        $scope.requestMessage = res.data.message;
      }
    });
  };

  $scope.verifyTaskName = function() {
    return $scope.submitted && $scope.createTask.taskName.$invalid;
  };

  $scope.verifyTaskProject = function() {
    return $scope.submitted && !!$scope.selectProject;
  };

  $scope.verifyTaskDate = function() {
    return $scope.submitted && !!$scope.setTaskDate;
  };

  $scope.setTodayDate = function() {
    $scope.setTaskDate = new Date();
  };

  $scope.setTomorrowDate = function() {
    var d = new Date();
    $scope.setTaskDate = new Date(d.valueOf() + 24 * 60 * 60 * 1000);
  };

  $scope.setDate = function() {
    console.log('I don\'t do anything yet');
  };

  $scope.reset = function() {
    $scope.submitted = false;
    $scope.name = '';
    $scope.requestMessage = '';
    $scope.selectProject = '';
    $scope.setTaskDate = '';
    $scope.createTask.$pristine = true;

    $scope.createTask.taskName.$invalid = true;
  };

  $scope.isSubmitDisabled = function() {
    return !$scope.createTask.$pristine &&
      $scope.createTask.$invalid &&
      $scope.verifyTaskProject() &&
      $scope.verifyTaskDate();
  };

  $scope.submit = function() {
    $scope.submitted = true;
    $scope.createTask.$pristine = false;

    $scope.createTask.$valid &&
      $scope.verifyTaskProject() &&
      $scope.verifyTaskDate() &&
      $scope.sendTask();
  };
};
