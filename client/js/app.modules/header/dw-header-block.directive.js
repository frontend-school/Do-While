/**
 * @ngInject
 * */
 module.exports = function(){
     return {
         restrict: 'E',
         transclude: true,
         templateUrl: '/views' + __dirname + '/dw-header-block.tpl.html'
     };
 };
