/*@ngInject*/
module.exports = function ($httpProvider) {
    $httpProvider.interceptors.push(require('./loaderHttp.interceptor'));
};