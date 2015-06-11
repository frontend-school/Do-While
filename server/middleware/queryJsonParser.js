module.exports = function (req, res, next) {
    req.query = tryParseJsonObjectParams(req.query);
    next();
};

function tryParseJsonObjectParams(obj) {
    var result = {};

    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }
        result[prop] = tryParseJsonObject(obj[prop]);
    }

    return result;

    function tryParseJsonObject(value) {
        if (typeof value === 'object') {
            return tryParseJsonObjectParams(value);
        }
        return tryParseJson(value);
    }

    function tryParseJson(jsonString) {
        try {
            return JSON.parse(jsonString.replace('\\', ''));
        } catch (e) {
            return jsonString;
        }
    }
}

