var angular = require('angular');
/**
 * @ngInject
 * */
module.exports = function ($stateProvider, viewResolverProvider) {

    var viewResolver = viewResolverProvider.$get();

    $stateProvider.decorator('views', require('./templateUrl.decorator')(viewResolver));
};