var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	config = require('../../layout.config');

var clientReport = __dirname + '/jshint.client.report.html';

gulp.task('quality:js', ['quality:js:client', 'quality:js:server']);

declareJsHintTask('client', config.patterns.src.js.all);
declareJsHintTask('server', config.patterns.server.js);

function declareJsHintTask(taskPrefix, srcPattern) {
	gulp.task('quality:js:' + taskPrefix, function () {
		return gulp.src(srcPattern)
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
	});
}