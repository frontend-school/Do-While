var gulp = require('gulp'),
    requireDir = require('require-dir');

var tasks = requireDir('./gulp/tasks');

gulp.task('default', ['build']);