/*@ngInject*/
module.exports = function (loaderService) {
    return {
        request: passWithStart,
        requestError: passWithFinish,
        response: passWithFinish,
        responseError: passWithFinish
    };

    function passWithStart(pass) {
        loaderService.start();
        return pass;
    }

    function passWithFinish(pass) {
        loaderService.finish();
        return pass;
    }
};