function ValidationError() {
    Error.call(this, 'validation');
    this.messages = [];
}

ValidationError.prototype = new Error;

ValidationError.prototype.addMessage = function (field, message) {
    this.messages.push({
        field: field,
        message: message
    });
    return this;
};

ValidationError.prototype.hasMessages = function () {
    return !!this.messages.length;
};

module.exports = ValidationError;