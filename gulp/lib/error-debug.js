var gutil = require('gulp-util');

function errorDebug(callback, errorHandler) {
    if (typeof errorHandler === 'undefined')
        errorHandler = errorDebug.errorHandler;
    return function (err) {
        if (err)
            errorHandler(err);
        callback()
    }
}

errorDebug._errorHandler = gutil.log.bind(gutil);

errorDebug.errorHandler = function (who) {
    who = typeof who === 'undefined' ? '' : ('' + who).trim() + ' ';
    return function (e) {
        return errorDebug._errorHandler(who + e.toString());
    };
};

module.exports = errorDebug;