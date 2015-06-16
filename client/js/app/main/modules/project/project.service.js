var projectEvents = require('./project.events');

/**
 * @ngInject
 */
module.exports = function ($q, $http, apiConfig, $rootScope) {

    var resourceUrl = apiConfig.basePath + '/projects';

    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update,
        remove: remove
    };

    function getAll(isExpandTasks) {
        var query = {};
        if (isExpandTasks) {
            query.expand = 'tasks'
        }
        return immutableRequest($http.get(resourceUrl, {
            query: query
        }));
    }

    function getById(id, isExpandTasks) {
        var query = {};
        if (isExpandTasks) {
            query.expand = 'tasks'
        }
        return immutableRequest($http.get(resourceUrl + '/' + id, {
            query: query
        }));
    }

    function create(project) {
        return mutableRequest($http.post(resourceUrl, project))
    }

    function update(id, project) {
        return mutableRequest($http.put(resourceUrl + '/' + id, project));
    }

    function remove(id, project) {
        return mutableRequest($http.delete(resourceUrl + '/' + id, project));
    }

    function mutableRequest(httpPromise) {
        return immutableRequest(httpPromise).then(function (project) {
            $rootScope.$emit(projectEvents.changed);
            return project;
        });
    }

    function immutableRequest(httpPromise) {
        var d = $q.defer();
        httpPromise
            .success(d.resolve.bind(d))
            .error(d.reject.bind(d));

        return d.promise;
    }
};
