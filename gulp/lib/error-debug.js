function errorDebug(callback, errorHandler) {
    if (typeof errorHandler === 'undefined')
        errorHandler = errorDebug.errorHandler;
    return function (err) {
        if (err)
            errorHandler(err);
        callback()
    }
}

errorDebug.errorHandler = console.warn;

module.exports = errorDebug;