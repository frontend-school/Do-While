var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    config = require('../config'),
    serverConfig = require('../../server/config.json');

gulp.task('server', ['watch'], function () {
    nodemon({
        watch: [config.paths.server._root],
        script: config.paths.server.app,
        ignore: [config.paths.dist._root],
        ext: 'js'
    }).on('restart', function (files) {
        console.log(files);
    });

    browserSync.init({
        proxy: "localhost:" + serverConfig.port,
        port: +serverConfig.port + 1,
        ui: {
            port: +serverConfig.port + 2
        }
    });
});

gulp.task('server:static', ['watch'], function () {
    browserSync.init({
        server: config.paths.dist._root,
        port: +serverConfig.port + 1,
        ui: {
            port: +serverConfig.port + 2
        }
    });
});