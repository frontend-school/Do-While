var gulp = require('gulp'),
    config = require('../config');

gulp.task('watch', ['build'], function () {
    gulp.watch([
            config.patterns.src.html.pages,
            config.patterns.src.html.pageComponents
        ], ['build:html:pages']
    );
    gulp.watch(config.patterns.src.html.views, ['build:html:views']);
    gulp.watch(config.patterns.src.scss, ['build:scss_light']);
    gulp.watch(config.patterns.src.js, ['build:js']);
});