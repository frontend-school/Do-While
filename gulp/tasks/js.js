var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserify = require('gulp-browserify'),
    del = require('del'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

gulp.task('build:js', ['clean:js'], function () {
    return gulp.src(config.paths.src.js.main)
        .pipe(browserify({
            debug : !gulp.env.production
        }))
        .on('error', errorDebug.errorHandler)
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('clean:js', function (onDone) {
    del(config.patterns.dist.js, errorDebug(onDone));
});
