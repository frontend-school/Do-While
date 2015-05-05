var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    config = require('../config');

gulp.task('server', ['watch'], function () {
    nodemon({
        watch: [config.paths.server._root],
        script: config.paths.server.app,
        ignore: [config.patterns.dist.all],
        ext: 'js'
    });
});