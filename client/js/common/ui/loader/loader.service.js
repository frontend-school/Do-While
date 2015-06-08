/*@ngInject*/
module.exports = function ($rootScope) {
    var pendingCount = 0;

    return {
        startOne: startOne,
        finishOne: finishOne
    };

    function startOne() {
        if (!isPending())
            $rootScope.$emit('loader:start');
        addPending();
    }


    function finishOne() {
        if (isPending()) {
            removePending();
            if (!isPending()) {
                $rootScope.$emit('loader:finish');
            }
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