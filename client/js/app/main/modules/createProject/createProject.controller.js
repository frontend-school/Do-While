/*
 * @ngInject
 * */
module.exports = function ($scope, createService) {

    $scope.addNewProject = function(){
        console.log('Add project! name: ' + $scope.name + ' color: ' + $scope.color);
        createService
            .sendData($scope);
    };
};