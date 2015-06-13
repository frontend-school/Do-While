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

    if ($scope.selectProject) {
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
    }
  };

  /*$scope.verifyColor = function () {
    return ($scope.color === undefined) && $scope.submitted;
  };*/

  $scope.verifyName = function () {
    return $scope.submitted && $scope.createTask.taskName.$invalid;
  };

  /**
   * assssssssssssssssssssssssssssssssssssssssssssssss
   */

  // $scope.name = projectService.editedProject.name;

  $scope.showSelectedProject = function() {
    console.log($scope.selectProject);
  };

  $scope.setTodayDate = function() {
    $scope.setTaskDate = new Date();
    console.log($scope.setTaskDate);
  };

  $scope.setTomorrowDate = function() {
    var d = new Date();
    $scope.setTaskDate = new Date(d.valueOf() + 24 * 60 * 60 * 1000);
    console.log($scope.setTaskDate);
  };

  $scope.setDate = function() {
    console.log('I don\'t do anything yet');
  };

  /**
   *
   * asdgadgsdfhsdfhsdfgadfasdfSDFASDFA
   */
  
  $scope.reset = function () {
    $scope.submitted = false;
    $scope.name = '';
    $scope.requestMessage = '';
    $scope.selectProject = '';
    $scope.setTaskDate = '';
    $scope.createTask.$pristine = true;

    $scope.createTask.taskName.$invalid = true;
    // delete $scope.color;
  };

  $scope.isSubmitDisabled = function () {
    return (!$scope.createTask.$pristine && $scope.createTask.$invalid);
  };

  $scope.submit = function () {
    $scope.submitted = true;
    $scope.createTask.$pristine = false;

    $scope.createTask.$valid && $scope.sendTask();
  };
};
