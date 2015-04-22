var path = require('path');

var Builder = function (pattern, ext) {
    this._isExclude = false;
    this._pattern = pattern;

    if (typeof ext === 'undefined')
        ext = '*';

    this._extension = ext;
};

Builder.prototype.exclude = function () {
    this._isExclude = true;
    return this;
};

Builder.prototype.build = function (root) {
    if (Array.isArray(this._pattern))
        return this._pattern.map(function (pattern) {
            return this._buildPattern(pattern, root)
        }, this);
    return this._buildPattern(this._pattern, root)
};

Builder.prototype._buildPattern = function (pattern, root) {
    if (typeof root === 'undefined')
        root = '';
    var result = path.join('' + root, pattern + '.' + this._extension);
    if (this._isExclude)
        result = '!' + result;
    return result;
};

var BuilderFactory = function (pattern, ext) {
    return new Builder(pattern, ext);
};

BuilderFactory.Type = Builder;

BuilderFactory.allOfType = function (ext) {
    return new Builder('/*', ext);
};

BuilderFactory.deepAllOfType = function (ext) {
    return new Builder('/**/*', ext);
};

module.exports = BuilderFactory;

