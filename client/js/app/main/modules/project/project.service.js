/**
 * @ngInject
 */
module.exports = function ($http, apiConfig) {

    this.getById = function (id, callback) {
        $http.get(apiConfig.basePath + '/projects/' + id + '.json')
            .then(callback);
    };

    this.getTasks = function (id, callback) {
        $http.get(apiConfig.basePath + '/projects/' + id + '/tasks.json')
            .then(callback);
    };
};