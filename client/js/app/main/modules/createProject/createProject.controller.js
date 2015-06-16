var extend = require('angular').extend;

/*
 * @ngInject
 * */
module.exports = function ($scope, projectService, $state) {

    extend($scope, {
        error: {},
        input: {
            color: '',
            name: ''
        },

        /*methods*/
        submit: submit,
        reset: reset
    });

    /* watchers */

    $scope.$watch('input.name', function () {
        if ($scope.error) {
            delete $scope.error.name;
        }
    });

    $scope.$watch('input.color', function () {
        if ($scope.error) {
            delete $scope.error.color;
        }
    });

    /* internals */

    function submit() {
        if (isFromInvalid()) {
            return;
        }

        projectService
            .create($scope.input)
            .then(onProjectCreated)
            .catch(onError);

        /*internals*/

        function isFromInvalid() {
            return $scope.form.$invalid || $scope.error.color || $scope.error.name;
        }

        function onProjectCreated(project) {
            $state.transitionTo('main.project', {
                projectId: project._id
            });
        }

        function onError(error) {
            $scope.error = error.messages.reduce(function (error, message) {
                error[message.field] = message.message;
                return error;
            }, {});
        }
    }

    function reset() {
        $scope.input.color = null;
        $scope.input.name = null;
        $scope.form.reset();
    }
};
