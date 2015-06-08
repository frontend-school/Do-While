var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    sourceStream = require('vinyl-source-stream2'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    config = require('../../layout.config'),
    errorDebug = require('../lib/error-debug');

var bundleOptions = {
        entries: './' + config.paths.src.js.__layout.main,
        basedir: './' + config.paths.src.js._root,
        debug: !gulp.env.production,
        cache: {},
        packageCache: {}
    },
    isWatch = false,
    bundler = browserify(bundleOptions);

function bundleTask() {
    return bundler.bundle()
        .on('error', errorDebug.errorHandler('Browserify'))
        .pipe(sourceStream(config.paths.src.js.__layout.main))
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(gulpIf(isWatch, browserSync.reload({stream: true})));
}

function watchifyBundler(bundler) {
    watchify(bundler)
        .on('update', bundleTask)
        .on('log', gutil.log.bind(gutil, 'Watchify'));
    isWatch = true;
    gutil.log('Watchify start watching...');
}

gulp.task('watch:js', ['clean:js', 'build:html:templatecache.js'], function (cb) {
    if (!isWatch)
        watchifyBundler(bundler);
    cb();
});

gulp.task('build:js', ['clean:js', 'build:html:templatecache.js'], bundleTask);

gulp.task('clean:js', function (onDone) {
    del(config.patterns.dist.js, errorDebug(onDone));
});