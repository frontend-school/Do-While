var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    sourceStream = require('vinyl-source-stream2'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

var bundleOptions = {
    entries: './' + config.paths.src.js.__layout.main,
    basedir: './' + config.paths.src.js._root,
    debug: !gulp.env.production
};

var isWatch = false;

var bundler = browserify(bundleOptions);

function bundleTask() {
    return bundler.bundle()
        .on('error', errorDebug.errorHandler)
        .pipe(sourceStream(config.paths.src.js.__layout.main))
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(gulpIf(isWatch, browserSync.reload({stream: true})));
}

function watchifyBundler(bundler) {
    watchify(bundler)
        .on('update', bundleTask)
        .on('log', console.log.bind(console));
    isWatch = true;
}

gulp.task('watch:js', ['clean:js', 'hint:js'], function () {
    if (!isWatch)
        watchifyBundler(bundler);
    return bundleTask();
});

gulp.task('build:js', ['clean:js', 'hint:js'], bundleTask);

gulp.task('clean:js', function (onDone) {
    del(config.patterns.dist.js, errorDebug(onDone));
});

gulp.task('hint:js', function () {
    return gulp.src(config.patterns.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
