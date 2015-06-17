var extend = require('angular').extend,
    headerDirective = require('../header.directive');

/*@ngInject*/
module.exports = function () {
    return extend(headerDirective(), {
        templateUrl: 'formHeader.tpl.html'
    });
};
