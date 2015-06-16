/*@ngInject*/
module.exports = function () {
    var vm = this;

    vm.colors = [
        "yellow",
        "olive",
        "orange",
        "maroon",
        "red",
        "magenta",
        "violet",
        "purple",
        "blue",
        "cyan",
        "green",
        "green-yellow"
    ];

    vm.select = function (color) {
        vm.selectedColor = color;
    };

    vm.isSelected = function (color) {
        return vm.selectedColor === color;
    };
};