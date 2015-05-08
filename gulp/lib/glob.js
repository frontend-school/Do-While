var path = require('path'),
    CURRENT_DIR = './',
    PATTERN_ALL = '*';

var Builder = function (pattern, ext) {
    this._isExclude = false;
    this._pattern = pattern;

    if (typeof ext === 'undefined')
        ext = PATTERN_ALL;

    this._extension = ext;
};

Builder.prototype.exclude = function () {
    this._isExclude = true;
    return this;
};

Builder.prototype.build = function (root) {
    if (Array.isArray(this._pattern))
        return this._pattern.map(function (pattern) {
            return this._buildPatternItem(root, pattern)
        }, this);

    return this._buildPattern(root);
};

Builder.prototype._buildPattern = function (root) {
    return this._buildPatternItem(root, this._pattern);
};

Builder.prototype._buildPatternItem = function (root, pattern) {
    var result = CURRENT_DIR + path.join(root, this._buildPatternWithExtension(pattern));
    if (this._isExclude)
        result = '!' + result;
    return result;
};

Builder.prototype._buildPatternWithExtension = function (pattern) {
    return pattern + '.' + this._extension;
};

var BuilderFactory = function (pattern, ext) {
    return new Builder(pattern, ext);
};

BuilderFactory.Type = Builder;

BuilderFactory.allOfType = function (ext) {
    return new Builder('*', ext);
};

BuilderFactory.deepAllOfType = function (ext) {
    return new Builder('**/*', ext);
};

module.exports = BuilderFactory;