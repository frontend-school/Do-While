var AlreadySignedInError = require('./AlreadyAuthorizedError');

describe('AlreadySignedInError', function () {
    var alreadySignedInError = new AlreadySignedInError();

    it('should be instance of error', function () {
        expect(alreadySignedInError instanceof Error).to.be.true;
    });
});