var gulp = require('gulp'),
    del = require('del'),
    bowerFiles = require('main-bower-files'),
    bowerNormalize = require('gulp-bower-normalize'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');


gulp.task('copy:bower', ['clean:vendor'], function () {
    return gulp.src(bowerFiles(), {base: config.paths.bower})
        .pipe(bowerNormalize({
            flatten: true
        }))
        .pipe(gulp.dest(config.paths.dist.vendor._root));
});

gulp.task('clean:vendor', function (onDone) {
    del(config.patterns.dist.vendor, errorDebug(onDone));
});