var gulp = require('gulp'),
    del = require('del'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

gulp.task('copy:apiMock', ['clean:apiMock'], function () {
    return gulp.src(config.patterns.src.data)
        .pipe(gulp.dest(config.paths.dist.data));
});

gulp.task('clean:apiMock', function (onDone) {
    del(config.patterns.dist.data, errorDebug(onDone));
});