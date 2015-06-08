var mock = require('angular-mocks'),
    LoaderEventManager = require('./loaderEventManager.service');

describe('LoaderDelayedEventManager', function () {
    var loaderManager,
        $rootScope,
        $timeout;

    var $rootScope_$on_loader__start,
        $rootScope_$on_loader__finish,
        delay,
        freeze;

    beforeEach(mock.inject(function (_$rootScope_, _$timeout_) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;

        $rootScope_$on_loader__start = sinon.stub();
        $rootScope_$on_loader__finish = sinon.stub();

        $rootScope.$on('loader:start', function () {
            $rootScope_$on_loader__start();
        });

        $rootScope.$on('loader:finish', function () {
            $rootScope_$on_loader__finish();
        });
    }));

    describe('when no delay and no freeze in loaderConfig', function () {
        beforeEach(function () {
            loaderManager = LoaderEventManager($rootScope, $timeout, {
                delay: 0,
                freeze: 0
            });
        });

        it('@start should emit loader:start event', function () {
            loaderManager.start();
            $rootScope_$on_loader__start.should.have.been.calledOnce;
        });

        it('@finish should emit loader:finish event', function () {
            loaderManager.finish();
            $rootScope_$on_loader__finish.should.have.been.calledOnce;
        });
    });

    describe('when delay is spec', function () {

        beforeEach(function () {
            delay = 200;
            loaderManager = LoaderEventManager($rootScope, $timeout, {
                delay: delay,
                freeze: 0
            });
        });

        describe('when no time gap between @start and @finish calls', function () {
            beforeEach(function () {
                loaderManager.start();
                loaderManager.finish();
            });

            it('should not emit loader:start event after delay', function () {
                $rootScope_$on_loader__start.should.have.been.not.called;
            });

            it('should not emit loader:finish event after delay', function () {
                $rootScope_$on_loader__finish.should.have.been.not.called;
            });
        });

        describe('when time gap between @start and @finish calls is more than delay', function () {
            var moreDelay;

            beforeEach(function () {
                moreDelay = delay + 100;
                loaderManager.start();
            });

            it('should emit loader:start event after delay', function () {
                $timeout(function () {
                    $rootScope_$on_loader__start.should.have.been.calledOnce;
                }, moreDelay);
                $timeout.flush();
            });

            it('should emit loader:finish event after delay', function (done) {
                $timeout(function () {
                    loaderManager.finish();
                    $rootScope_$on_loader__finish.should.have.been.calledOnce;
                    done();
                }, moreDelay);
                $timeout.flush();
            });
        });
    });

    describe('when freeze is spec', function () {
        beforeEach(function () {
            freeze = 900;
            loaderManager = LoaderEventManager($rootScope, $timeout, {
                delay: 0,
                freeze: freeze
            });
        });

        describe('when no time gap between @start and @finish calls', function () {
            beforeEach(function () {
                loaderManager.start();
                loaderManager.finish();
            });

            it('should not emit loader:finish event imideately', function () {
                $rootScope_$on_loader__finish.should.have.been.not.called;
            });

            it('should emit loader:finish event after freeze', function (done) {
                $timeout(function () {
                    $rootScope_$on_loader__finish.should.have.been.calledOnce;
                    done();
                }, freeze + 100);
                $timeout.flush();
            });
        });
    });

    describe('when delay and freeze is spec', function () {
        beforeEach(function () {
            delay = 400;
            freeze = 1000;
            loaderManager = LoaderEventManager($rootScope, $timeout, {
                delay: delay,
                freeze: freeze
            });
        });

        describe('when no time gap between @start and @finish calls', function () {
            beforeEach(function () {
                loaderManager.start();
                loaderManager.finish();
            });

            it('should not emit loader:start event after delay', function () {
                $rootScope_$on_loader__start.should.have.been.not.called;
            });

            it('should not emit loader:finish event after delay', function () {
                $rootScope_$on_loader__finish.should.have.been.not.called;
            });
        });

        describe('when time gap between @start and @finish calls is more than delay', function () {
            var moreDelay;

            beforeEach(function () {
                moreDelay = delay + 100;
                loaderManager.start();
            });

            it('should emit loader:start event after delay', function (done) {
                $timeout(function () {
                    $rootScope_$on_loader__start.should.have.been.calledOnce;
                    done();
                }, moreDelay);
                $timeout.flush();
            });

            it('should not emit loader:finish event after delay', function (done) {
                $timeout(function () {
                    loaderManager.finish();
                    $rootScope_$on_loader__finish.should.have.been.not.called;
                    done();
                }, moreDelay);
                $timeout.flush();
            });
        });
    });
});