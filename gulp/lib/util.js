module.exports.isUndefined = function (arg) {
    return typeof arg === 'undefined';
};

module.exports.isString = function (arg) {
    return typeof arg === 'string';
};

module.exports.isObject = function (arg) {
    return typeof arg === 'object' && arg !== null;
};

module.exports.isArray = function (arg) {
    return Array.isArray(arg);
};