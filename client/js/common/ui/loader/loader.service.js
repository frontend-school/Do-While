/*@ngInject*/
module.exports = function (loaderEventManager) {
    var pendingCount = 0;

    return {
        startOne: startOne,
        finishOne: finishOne
    };

    function startOne() {
        if (!isPending()) {
            loaderEventManager.start();
        }
        addPending();
    }

    function finishOne() {
        if (isPending()) {
            onRaiseFinishEvent();
        }
    }

    function onRaiseFinishEvent() {
        removePending();
        if (!isPending()) {
            loaderEventManager.finish();
        }
    }

    function isPending() {
        return pendingCount > 0;
    }

    function addPending() {
        ++pendingCount;
    }

    function removePending() {
        --pendingCount;
    }
};