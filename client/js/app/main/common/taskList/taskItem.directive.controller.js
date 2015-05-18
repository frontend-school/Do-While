/*
* @ngInject
* */
function TaskItemController() {
    this.isSelected = false;
}

TaskItemController._selected = null;

TaskItemController.prototype.toggleSelection = function () {
    this.isSelected = !this.isSelected;
    if(TaskItemController._selected && (TaskItemController._selected !== this))
        TaskItemController._selected.isSelected = false;
    TaskItemController._selected = this;
};

module.exports = TaskItemController;