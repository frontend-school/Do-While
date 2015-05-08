var errorHandler = require('errorhandler');

module.exports = function (app) {
    if (app.get('env') === 'development')
        app.use(errorHandler());
};