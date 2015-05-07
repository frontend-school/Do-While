/**
 * @ngInject
 * */
 module.exports = function(){
    return {
        isMenuHide: true,
        menuShowHide: function(){
            this.isMenuHide = !this.isMenuHide;
        }
    };
};
