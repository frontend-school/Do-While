/**
 * @ngInject
 * */
module.exports = function ($scope, $timeout) {
    $scope.text = "";
    $scope.isHidden = false;

    $scope.hide = function () {
        $scope.isHidden = true;
        $timeout(function () {
            $scope.isHidden = false;
            $scope.text = "I am back :)";
        }, 1000);
    };
};