var angular = require('angular');

/*@ngInject*/
module.exports = function (loaderConfig, $timeout) {
    var loadingCount = 0,
        startTime = null,
        pendingAddLoadPromise = null,
        pendingAddLoadCount = 0;

    return {
        start: start,
        finish: finish,
        isLoading: isLoading
    };

    function start() {
        if (!isLoading() && !isPendingStart()) {
            startTime = new Date;
        }

        if (loaderConfig.threshold > 0) {
            addPendingLoad();
        } else {
            addLoad();
        }

        function addPendingLoad() {

            if (pendingAddLoadPromise) {
                pendingAddLoadCount += 1;
            } else {
                createPendingAddLoadPromise();
            }

            function createPendingAddLoadPromise() {
                pendingAddLoadCount = 1;
                pendingAddLoadPromise = $timeout(function () {
                    addLoad(pendingAddLoadCount);
                    pendingAddLoadPromise = null;
                    pendingAddLoadCount = 0;
                }, loaderConfig.threshold);
            }
        }

        function addLoad(count) {
            if (angular.isUndefined(count)) {
                count = 1;
            }
            loadingCount += +count;
        }
    }

    function finish() {
        if (pendingAddLoadPromise) {
            removePendingAddLoad();
        } else if (isLoading()) {
            removeLoad();
        }

        function removePendingAddLoad() {
            pendingAddLoadCount -= 1;
            if (pendingAddLoadCount === 0) {
                $timeout.cancel(pendingAddLoadPromise);
                pendingAddLoadPromise = null;
            }
        }

        function removeLoad() {
            var timeSpanToRemoveLoad = getTimeSpanToRemoveLoad();
            if ((loadingCount === 1) && (timeSpanToRemoveLoad > 0)) {
                $timeout(function () {
                    --loadingCount;
                }, timeSpanToRemoveLoad);
            } else {
                --loadingCount;
            }

            function getTimeSpanToRemoveLoad() {
                var timeSpanToRemoveLoad = loaderConfig.release - getLoadingTime();
                if (timeSpanToRemoveLoad > 0) {
                    return timeSpanToRemoveLoad;
                }
                return 0;

                function getLoadingTime() {
                    if (startTime instanceof Date) {
                        return (new Date) - startTime;
                    }
                    return 0;
                }
            }
        }
    }

    function isLoading() {
        return loadingCount > 0;
    }

    function isPendingStart() {
        return pendingAddLoadPromise && pendingAddLoadCount > 0;
    }
};