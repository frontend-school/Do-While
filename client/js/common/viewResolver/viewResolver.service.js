var angular = require('angular'),
    path = require('path');

module.exports = function (viewBasePath) {

    this.resolve = function (viewName, root) {
        var viewUrlObj = viewName;

        if (angular.isString(viewName))
            viewUrlObj = createViewUrlObj(viewName, root);

        if (!canResolve(viewUrlObj))
            return viewUrlObj;

        return resolve(viewUrlObj);
    };

    function createViewUrlObj(viewName, root) {
        return {
            name: viewName,
            root: root
        };
    }

    function canResolve(viewUrlObj) {
        if (!angular.isObject(viewUrlObj))
            return false;
        return !angular.isUndefined(viewUrlObj.name);
    }

    function resolve(viewUrlObj) {
        var basePath = viewBasePath;

        if (!angular.isUndefined(viewUrlObj._basePath))
            basePath = viewUrlObj._basePath;

        if (angular.isUndefined(viewUrlObj.root))
            return path.join(basePath, viewUrlObj.name);

        return path.join(basePath, viewUrlObj.root, viewUrlObj.name);
    }
};