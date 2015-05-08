/**
 * @ngInject
 */
module.exports = function ($provide) {
    $provide.decorator('$rootScope', require('./onRootScope.decorator.js'));
};