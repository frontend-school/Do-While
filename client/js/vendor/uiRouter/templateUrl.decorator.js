module.exports = function (viewResolver) {
    return function (state, parent) {
        var resultViews = {},
            views = parent(state);

        angular.forEach(views, function (view, name) {
            view.templateUrl = viewResolver.resolve(view.templateUrl);
            resultViews[name] = view;
        });

        return resultViews;
    };
};