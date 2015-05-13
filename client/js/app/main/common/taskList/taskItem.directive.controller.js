/*
* @ngInject
* */
function TaskItemViewModel() {
    this.isSelected = false;
}

TaskItemViewModel._selected = null;

TaskItemViewModel.prototype.toggleSelection = function () {
    this.isSelected = !this.isSelected;
    if(TaskItemViewModel._selected && (TaskItemViewModel._selected !== this))
        TaskItemViewModel._selected.isSelected = false;
    TaskItemViewModel._selected = this;
};

module.exports = TaskItemViewModel;