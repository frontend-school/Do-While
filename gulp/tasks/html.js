var gulp = require('gulp'),
    liveReload = require('gulp-livereload'),
    fileInclude = require('gulp-file-include'),
    del = require('del'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');;

gulp.task('build:html', ['build:html:pages', 'build:html:views']);


gulp.task('build:html:pages', ['clean:html:pages'], function () {
    return gulp.src(config.patterns.src.html.pages)
        .pipe(fileInclude())
        .on('error', errorDebug.errorHandler)
        .pipe(gulp.dest(config.paths.dist.html.pages))
        .pipe(liveReload());
});

gulp.task('clean:html:pages', function (onDone) {
    del(config.patterns.dist.html.pages, errorDebug(onDone));
});


gulp.task('build:html:views', ['clean:html:views'], function () {
    return gulp.src(config.patterns.src.html.views)
        .pipe(gulp.dest(config.paths.dist.html.views))
        .pipe(liveReload());
});

gulp.task('clean:html:views', function (onDone) {
    del(config.patterns.dist.html.views, errorDebug(onDone));
});