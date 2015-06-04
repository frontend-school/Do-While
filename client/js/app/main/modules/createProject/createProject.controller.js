/*
 * @ngInject
 * */
module.exports = function ($scope, projectService) {

  $scope.submitted = false;

  var vm = this;

  vm.arrayOfColors = [
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

  vm.checkProjects = function () {
    // if ($scope.color === undefined) return;

    projectService.getAllProjects().then(function (res) {

      vm.isExistProject = {
        name: false,
        color: false
      };

      var projects = res.data.items;

      for (var i = 0; i < projects.length; i++) {
        if (projects[i].name == $scope.name) {
          vm.isExistProject.name = true;
        }
        if (projects[i].color == $scope.color) {
          vm.isExistProject.color = true;
        }
      }

      if (vm.isExistProject.name && vm.isExistProject.color) {
        alert("Project with the same name and color is existing!");
      } else if (vm.isExistProject.name) {
        alert("Project with the same name is existing!");
      } else if (vm.isExistProject.color) {
        alert("Project with the same color is existing!");
      } else {
        alert('Project "'+$scope.name+'" with "' + $scope.color + '" color was added!');

        projectService.create({
          name: $scope.name.toLowerCase(),
          color: $scope.color.toLowerCase()
        });

        $scope.fullReset();
      }
    });
  };

  vm.chooseColor = function (item) {
    $scope.color = item;
  };

  $scope.fullReset = function () {
    $scope.name = null;
  };

  $scope.reset = function () {
    $scope.submitted = false;
    $scope.createProject.$pristine = true;
  };

  $scope.checkColor = function () {
    return (($scope.color === undefined) && $scope.submitted) ? true : false;
  };

  $scope.checkName = function (a) {
    (a == undefined) ? 0 : a;
    return (!a && $scope.submitted && $scope.createProject.projectName.$invalid) ? true : false;
  };

  $scope.disableSubmit = function () {
    return (($scope.color === undefined) && !$scope.createProject.$pristine && $scope.submitted && $scope.createProject.$invalid) ? true : false;
  };

};
