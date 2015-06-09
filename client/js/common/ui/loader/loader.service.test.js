var LoaderService = require('./loader.service');

describe('LoaderService', function () {
    var loaderService,
        threshold,
        release;

    function $timeout(callback, time) {
        return setTimeout(callback, time);
    }

    $timeout.cancel = function (timeout) {
        clearTimeout(timeout);
    };

    function afterThreshold(callback) {
        setTimeout(callback, threshold + 100);
    }

    function afterRelease(callback) {
        setTimeout(callback, release + 100);
    }

    function beforeThreshold(callback) {
        setTimeout(callback, threshold / 2);
    }

    function beforeRelease(callback) {
        setTimeout(callback, release / 2);
    }

    describe('when threshold = 0ms and release = 0ms', function () {

        beforeEach(function () {
            threshold = 0;
            release = 0;
            loaderService = LoaderService({
                threshold: threshold,
                release: release
            }, $timeout);
        });

        describe('@start called once', function () {
            beforeEach(function () {
                loaderService.start();
            });

            it('should @isLoading when called once', function () {
                loaderService.isLoading().should.be.true;
            });

            it('should not @isLoading when @finish called once', function () {
                loaderService.finish();
                loaderService.isLoading().should.be.false;
            });
        });

        describe('@start called n times, n > 1', function () {
            var startCallCount;
            beforeEach(function () {
                startCallCount = 10;
                callTimes(loaderService.start, loaderService, startCallCount);
            });

            it('should not @isLoading when @finish called n times', function () {
                callTimes(loaderService.finish, loaderService, startCallCount);
                loaderService.isLoading().should.be.false;
            });

            it('should still @isLoading when @finish called n - k times, 0 < k < n', function () {
                callTimes(loaderService.finish, loaderService, startCallCount - 1);
                loaderService.isLoading().should.be.true;
            });
        });

        describe('@finish called once', function () {
            it('should not @isLoading when called', function () {
                loaderService.isLoading().should.be.false;
                loaderService.finish();
                loaderService.isLoading().should.be.false;
            });
        });
    });

    describe('when threshold > 0ms and release = 0ms', function () {

        beforeEach(function () {
            threshold = 200;
            release = 0;
            loaderService = LoaderService({
                threshold: threshold,
                release: release
            }, $timeout);
            threshold += 100;
        });

        describe('@start called once', function () {
            beforeEach(function () {
                loaderService.start();
            });

            it('should @isLoading after threshold', function (done) {
                loaderService.isLoading().should.be.false;
                afterThreshold(function () {
                    loaderService.isLoading().should.be.true;
                    done();
                });
            });

            it('should not @isLoading when @finish before threshold', function (done) {
                loaderService.finish();
                loaderService.isLoading().should.be.false;

                afterThreshold(function () {
                    loaderService.isLoading().should.be.false;
                    done();
                });
            });
        });

        describe('@start called n times, n > 1', function () {
            var startCallCount;
            beforeEach(function () {
                startCallCount = 10;
                callTimes(loaderService.start, loaderService, startCallCount);
            });

            it('should not @isLoading when @finish called n times before threshold', function (done) {
                beforeThreshold(function () {
                    callTimes(loaderService.finish, loaderService, startCallCount);
                    loaderService.isLoading().should.be.false;
                });

                afterThreshold(function () {
                    loaderService.isLoading().should.be.false;
                    done();
                });
            });

            it('should still @isLoading after threshold when @finish called n - k times, 0 < k < n', function (done) {
                callTimes(loaderService.finish, loaderService, startCallCount - 1);
                afterThreshold(function () {
                    loaderService.isLoading().should.be.true;
                    done();
                });
            });
        });

        describe('@finish called once', function () {
            it('should not @isLoading when called', function () {
                loaderService.isLoading().should.be.false;
                loaderService.finish();
                loaderService.isLoading().should.be.false;
            });
        });

    });

    describe('when threshold = 0ms and release > 0ms', function () {
        beforeEach(function () {
            threshold = 0;
            release = 700;
            loaderService = LoaderService({
                threshold: threshold,
                release: release
            }, $timeout);
            release += 100;
        });

        describe('@start called once', function () {
            beforeEach(function () {
                loaderService.start();
            });

            it('should @isLoading when last @finish called before release', function (done) {
                beforeRelease(function () {
                    loaderService.finish();
                    loaderService.isLoading().should.be.true;
                    done();
                });
            });

            it('should not @isLoading after release when last @finish called before release', function (done) {
                beforeRelease(function () {
                    loaderService.finish();
                });

                afterRelease(function () {
                    loaderService.isLoading().should.be.false;
                    done();
                });
            });


            it('should not @isLoading after release when last @finish called after release', function (done) {
                afterRelease(function () {
                    loaderService.finish();
                    loaderService.isLoading().should.be.false;
                    done();
                });
            });
        });
    });

    function callTimes(callback, _this, times) {
        while (times--) {
            callback.call(_this);
        }
    }

});