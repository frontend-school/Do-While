/*@ngInject*/
module.exports = function ($rootScope, $timeout, loaderConfig) {
    var MIN_DELAY = 90;

    var pendingStart = null,
        startTime = null;

    return {
        start: start,
        finish: finish
    };

    function start() {
        if (loaderConfig.delay >= MIN_DELAY) {
            pendingStart = $timeout(function () {
                onStart();
            }, loaderConfig.delay);
        } else {
            onStart();
        }
    }

    function onStart() {
        $rootScope.$emit('loader:start');
        pendingStart = null;
        startTime = new Date;
    }

    function finish() {
        if (isPendingStart()) {
            cancelPendingStart();
        } else {
            tryFinish();
        }
    }

    function isPendingStart() {
        return !!pendingStart;
    }

    function cancelPendingStart() {
        $timeout.cancel(pendingStart);
        pendingStart = null;
    }

    function tryFinish() {
        var finishTimeout = getFinishTimeout();
        if (finishTimeout === 0) {
            onFinish();
        } else {
            console.log('not gone timeout', finishTimeout, loaderConfig.freeze);
            $timeout(onFinish, finishTimeout);
        }
        startTime = null;
    }

    function onFinish() {
        $rootScope.$emit('loader:finish');
    }

    function getFinishTimeout() {
        var finishTimeout = loaderConfig.freeze - getShowTime();
        if (finishTimeout < 0) {
            finishTimeout = 0;
        }
        return finishTimeout;
    }

    function getShowTime() {
        return (new Date) - startTime;
    }
};