/*@ngInject*/
module.exports = function ($q, loaderService) {
    return {
        request: function (req) {
            loaderService.start();
            return req;
        },
        response: function (res) {
            loaderService.finish();
            return res;
        },
        responseError: function (reason) {
            loaderService.finish();
            return $q.reject(reason);
        }
    };
};