/*@ngInject*/
module.exports = function (loaderService) {
    return {
        request: passWithStart,
        requestError: passWithFinish,
        response: passWithFinish,
        responseError: passWithFinish
    };

    function passWithStart(pass) {
        loaderService.startOne();
        return pass;
    }

    function passWithFinish(pass) {
        loaderService.finishOne();
        return pass;
    }
};