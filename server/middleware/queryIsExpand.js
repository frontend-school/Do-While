var util = require('../../lib/util');

module.exports = function (req, res, next) {
    req.query.isExpand = isExpand;
    next();
};

//this === request.query
function isExpand(propertyPath) {

    if (!this)
        return false;

    propertyPath = normalizePropertyPath(propertyPath);
    return !!getProperty(normalizeExpandObject(this.expand), propertyPath);

    function normalizeExpandObject(expand) {

        if (!expand) {
            return {};
        }

        if (util.isString(expand)) {
            expand = expand.split(',')
                .reduce(pushIfNotEmpty, []);
        }

        if (util.isArray(expand)) {
            expand = expand.reduce(function (expand, property) {
                property = normalizeExpandObjectProperty(property);
                if (util)
                    expand[property.property] = property.value;
                return expand;
            }, {});
        }

        return expand;

        function normalizeExpandObjectProperty(property) {
            property = ('' + property).split('.').reduce(pushIfNotEmpty, []);
            if (!property.length)
                return undefined;

            return {
                property: property.shift(),
                value: buildObjectByPropertyPath(property)
            };

            function buildObjectByPropertyPath(propertyPath) {
                var obj = {},
                    objNode = obj;

                var i = -1;

                while (++i < propertyPath.length)
                    objNode = (objNode[propertyPath[i]] = {});

                return obj;
            }
        }
    }

    function getProperty(obj, propertyPath) {
        if (!propertyPath.length) {
            return obj;
        }

        var i = -1;

        while (++i < propertyPath.length) {
            var property = propertyPath[i];

            if (!obj.hasOwnProperty(property)) {
                return undefined;
            }

            obj = obj[property];
        }

        return obj;
    }

    function normalizePropertyPath(propertyPath) {
        if (!util.isArray(propertyPath)) {
            propertyPath = propertyPath.split('.');
        }
        return propertyPath.reduce(pushIfNotEmpty, []);
    }
}

function pushIfNotEmpty(array, item) {
    item = ('' + item).trim();
    if (item)
        array.push(item);
    return array;
}

