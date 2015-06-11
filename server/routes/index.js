var express = require('express'),
    path = require('path');

module.exports = function (app) {

    app.use(express.static(path.join(__dirname, '../public')));

    app.use('/api', require('./api'));

    app.all('/q', function (req, res) {
        res.json({
            method: req.method,
            body: req.body,
            query: req.query
        })
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};