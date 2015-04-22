var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../config');

gulp.task('watch', ['build'], function () {
    browserSync.init({
        proxy: "localhost:3000"
    });
    gulp.watch([
            config.patterns.src.html.pages,
            config.patterns.src.html.pageComponents
        ], ['build:html:pages']
    );
    gulp.watch(config.patterns.src.html.views, ['build:html:views']);
    gulp.watch(config.patterns.src.scss, ['build:scss_light']);
    gulp.watch(config.patterns.src.js, ['build:js']);
});