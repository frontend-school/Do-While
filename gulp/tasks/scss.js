var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    liveReload = require('gulp-livereload'),
    path = require('path'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

function buildScss() {
    return gulp.src(config.paths.src.scss.main)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(liveReload());
}

gulp.task('build:scss', ['build:img:icons', 'clean:css'], function () {
    return buildScss();
});

gulp.task('build:scss_light', ['clean:css'], function () {
    return buildScss()
});

gulp.task('clean:css', function (onDone) {
    del(config.patterns.dist.css, errorDebug(onDone));
});


