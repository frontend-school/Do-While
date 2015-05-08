/**
 * @ngInject
 */
module.exports = function ($delegate) {

    Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
        value: function (name, listener) {
            var unsubscribe = $delegate.$on(name, listener);
            this.$on('$destroy', unsubscribe);
            return unsubscribe;
        },
        enumerable: false
    });

    return $delegate;
};