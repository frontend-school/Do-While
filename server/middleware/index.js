var logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function (app) {
    app
        .use(logger('dev'))
        .use(cookieParser())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended: false}))
        .use(methodOverride())
        .use(require('./queryJsonParser'))
        .use(require('./queryIsExpand'));

    require('./passport')(app);
};