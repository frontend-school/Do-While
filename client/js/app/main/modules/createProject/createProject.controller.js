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

        $scope.reset();
      }
    });
  };

  vm.chooseColor = function (item) {
    $scope.color = item;
  };

  vm.checkColor = function (item) {
    return (item === $scope.color) ? true : false;
  };

  $scope.verifyColor = function () {
    return (($scope.color === undefined) && $scope.submitted) ? true : false;
  };

  $scope.checkName = function (a) {
    (a == undefined) ? 0 : a;
    return (!a && $scope.submitted && $scope.createProject.projectName.$invalid) ? true : false;
  };

  $scope.reset = function () {
    $scope.submitted = false;
    $scope.name = '';
    $scope.createProject.$pristine = true;
    $scope.createProject.projectName.$invalid = true;
    delete $scope.color;
  };

  $scope.disableSubmit = function () {
    return ($scope.verifyColor() && !$scope.createProject.$pristine && $scope.createProject.$invalid) ? true : false;
  };

  $scope.submit = function () {
    $scope.submitted = true;
    $scope.createProject.$pristine = false;

    !($scope.color === undefined) && $scope.createProject.$valid && vm.checkProjects();
  };

};
