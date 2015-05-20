module.exports = function($http){

    this.sendData = function (project) {
        console.log('name: ' + project.name + ' color: ' + project.color);
        $http.post('/api/projects/add', { name: project.name, color: project.color });
    };

};