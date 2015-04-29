/**
 * @ngInject
 * */
 module.exports = function(){
     return {
         restrict: 'E',
         transclude: true,
         scope: {
            isProjectView: '@',
            isNavHide: '='
         },
         templateUrl: '/views' + __dirname + '/header.html',
         link: function(scope, element, attrs){
            
         }
     };
 };
