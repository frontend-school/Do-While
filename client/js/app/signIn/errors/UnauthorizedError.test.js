var UnauthorizedError = require('./UnauthorizedError');

describe('UnauthorizedError', function () {
    var unauthorizedError;
    beforeEach(function () {
        unauthorizedError = new UnauthorizedError();
    });

    it('should be instance of error', function () {
        expect(unauthorizedError instanceof Error).to.be.true;
    });
});