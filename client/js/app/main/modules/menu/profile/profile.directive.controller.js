/*@ngInject*/
module.exports = function ($state, profileService, credentials) {
    var vm = this;

    profileService.getProfile()
        .success(function (profile) {
            vm.name = profile.name;
            vm.photo = profile.photo + '?sz=76';
        });

    vm.signOut = function () {
        credentials.reset();
        $state.go('signIn');
    }
};