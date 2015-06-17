var extend = require('angular').extend;

/*
 * @ngInject
 * */
module.exports = function () {
    return function (scope, onSubmit, project) {
        var input = project || {
                color: null,
                name: null
            };

        extend(scope, {
            input: input,
            error: {}
        });

        /* watchers */

        scope.$watch('input.name', function () {
            if (scope.error) {
                delete scope.error.name;
            }
        });

        scope.$watch('input.color', function () {
            if (scope.error) {
                delete scope.error.color;
            }
        });

        /* internals */

        scope.submit = function () {
            if (!isFromInvalid()) {
                onSubmit(scope.input)
                    .catch(onError);
            }

            /*internals*/

            function isFromInvalid() {
                return scope.form.$invalid || scope.error.color || scope.error.name;
            }

            function onError(err) {
                scope.error = err.messages.reduce(function (error, message) {
                    error[message.field] = message.message;
                    return error;
                }, {});
            }
        };

        scope.reset = function () {
            scope.input.name = null;
            scope.input.color = null;
        };
    };
};
