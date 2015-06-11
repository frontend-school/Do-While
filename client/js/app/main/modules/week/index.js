module.exports = require('angular')
	.module('weekModule', [
		require('./weekCalendar')
	])
	.config(require('./week.config'))
	.name;
