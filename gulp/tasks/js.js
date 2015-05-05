var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    liveReload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    del = require('del'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

gulp.task('build:js', ['clean:js', 'hint:js'], function () {
    return gulp.src(config.paths.src.js.main)
        .pipe(browserify({
            debug : !gulp.env.production
        }))
        .on('error', errorDebug.errorHandler)
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(liveReload());
});

gulp.task('clean:js', function (onDone) {
    del(config.patterns.dist.js, errorDebug(onDone));
});

gulp.task('hint:js', function () {
    gulp.src(config.paths.src.js.all)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
