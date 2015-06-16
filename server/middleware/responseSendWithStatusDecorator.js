module.exports = function (__, res, next) {
    res.ok = ok;
    res.created = created;
    res.badRequest = badRequest;
    res.unauthorized = unauthorized;
    res.notFound = unauthorized;
    next();
};

function ok(data) {
    return this.status(200)
        .json(data);
}

function created(data) {
    return this.status(201)
        .json(data);
}

function badRequest(data) {
    return this.status(400)
        .json(data);
}

function unauthorized(data) {
    return this.status(401)
        .json(data);
}

function notFound(data) {
    return this.status(404)
        .json(data);
}