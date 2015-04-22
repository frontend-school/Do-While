var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    config = require('../config'),
    serverConfig = require('../../server/config.json');

gulp.task('server', ['watch'], function () {
    nodemon({
        watch: [config.paths.server._root],
        script: config.paths.server.app,
        ignore: [config.patterns.dist.all],
        ext: 'js'
    });

    browserSync.init({
        proxy: "localhost:" + serverConfig.port,
        port: +serverConfig.port + 1,
        ui: {
            port: +serverConfig.port + 2
        }
    });
});