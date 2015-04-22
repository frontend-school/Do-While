var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    path = require('path'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

function buildScss() {
    return gulp.src(config.paths.src.scss.main)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(browserSync.reload({stream:true}));
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


