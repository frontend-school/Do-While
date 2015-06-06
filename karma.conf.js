var layout = require('./layout.config');

var isTddMode = true;

module.exports = function (config) {
    config.set({
        port: 9876,
        frameworks: ['browserify', 'mocha', 'sinon-chai'],

        basePath: '',
        preprocessors: (function (pattern) {
            var preprocessors = {};
            preprocessors[pattern] = ['browserify'];
            return preprocessors;
        })(layout.patterns.src.js.tests),

        files: [].concat(layout.patterns.src.js.tests),

        reporters: ['mocha'],
        colors: true,
        logLevel: config.LOG_INFO,

        browsers: ['Chrome']
    });
};