var connection = require('mongoose').createConnection('localhost', 'server');

module.exports = {
    model: connection.model.bind(connection)
};