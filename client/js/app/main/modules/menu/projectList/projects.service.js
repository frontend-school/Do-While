/*
*@ngInject
* */
module.exports = function($http){
    this.getAll = function () {
        return $http.get('/api/projects');
    };
};