/*@ngInject*/
module.exports = function ($scope, project, projectForm, projectService, $state) {

    projectForm($scope, onSubmit, project);

    function onSubmit(project) {
        return projectService
            .update(project._id, project)
            .then(function (project) {
                console.log(project);
                $state.transitionTo('main.project', {
                    projectId: project._id
                });
            });
    }
};
