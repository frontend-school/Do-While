/**
 * @ngInject
 */
module.exports = function ($http, apiConfig) {

    this.getTasks = function(callback) {
        $http.get(apiConfig.basePath + '/today/data.json')
             .then(callback);
    };
};
