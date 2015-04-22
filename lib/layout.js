var path = require('path'),
    util = require('./util'),
    glob = require('./glob');

var Layout = function (root, paths) {

    if (util.isUndefined(paths) && util.isObject(root)) {
        paths = root;
        root = '';
    }

    this.__layout = paths;
    this._setRoot(root);
};

Layout.prototype._setRoot = function (root) {
    if (this._root === root)
        return;

    this._root = root;

    for (var property in this.__layout)
        this[property] = this._resolveProperty(property);
};

Layout.prototype._resolveProperty = function (property, value) {

    if (util.isUndefined(value))
        value = this.__layout[property];

    property = this._filterProperty(property);

    if (value instanceof Layout)
        return this._resolveLayoutProperty(property, value);

    if (value instanceof glob.Type)
        return this._resolveGlobProperty(property, value);

    if (util.isArray(value))
        return this._resolveArrayProperty(property, value);

    if (util.isObject(value))
        return this._resolveObjectProperty(property, value);

    return this._resolveStringProperty(property, value);
};

Layout.prototype._resolveLayoutProperty = function (property, value) {
    var valueRoot = value._root === '' ? property : value._root;

    return new Layout(path.join(this._root, valueRoot), value.__layout);
};

Layout.prototype._resolveGlobProperty = function (property, value) {
    return value.build(this._root);
};

Layout.prototype._resolveObjectProperty = function (property, value) {
    var valueRoot =  util.isUndefined(value._root) ? property : value._root;
    delete value._root;
    return new Layout(path.join(this._root, valueRoot), value);
};

Layout.prototype._resolveArrayProperty = function (property, values) {
    return values.map(function (value) {
        return this._resolveArrayItemProperty(property, value)
    }, this)
};

Layout.prototype._resolveArrayItemProperty = function (property, value) {
    if (value instanceof glob.Type)
        return this._resolveGlobProperty(property, value);

    if (util.isString(value))
        return this._resolveStringProperty(property, value);

    throw new Error('unsupported node type in layout');
};

Layout.prototype._resolveStringProperty = function (property, value) {
    return path.join(this._root, '' + value);
};

Layout.prototype._filterProperty = function (property) {
    if (property === '_root')
        return '';
    return property;
};

Layout.prototype.toString = function () {
    return this._root;
};

module.exports = Layout;