/*@ngInject*/
module.exports = function ($scope, projectForm, projectService, $state) {

    projectForm($scope, onSubmit);

    function onSubmit(project) {
        return projectService
            .create(project)
            .then(function (project) {
                $state.transitionTo('main.project', {
                    projectId: project._id
                });
            });
    }
};
