var express = require('express'),
    path = require('path');

module.exports = function (app) {

    app.use(express.static(path.join(__dirname, '../public')));

    app.use('/api', require('./api'));

    app.all('/q', function (req, res) {
        res.json({
            method: req.method,
            body: req.body,
            query: req.query,
            isExpand: {
                'a': req.query.isExpand('a'),
                'a.b': req.query.isExpand('a.b'),
                'a.b.c': req.query.isExpand('a.b.c'),
                'a.b.c.d': req.query.isExpand('a.b.c.d')
            }
        })
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};