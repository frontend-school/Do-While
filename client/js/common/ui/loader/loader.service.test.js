var mock = require('angular-mocks'),
    LoaderEventManager = require('./loaderEventManager.service'),
    LoaderService = require('./loader.service');

describe('LoaderService', function () {
    var loaderService,
        $rootScope,
        $timeout,
        $rootScope_$on_loader__start,
        $rootScope_$on_loader__finish;


    beforeEach(mock.inject(function (_$rootScope_, _$timeout_) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;

        $rootScope_$on_loader__start = sinon.spy();
        $rootScope_$on_loader__finish = sinon.spy();

        $rootScope.$on('loader:start', function () {
            $rootScope_$on_loader__start();
        });

        $rootScope.$on('loader:finish', function () {
            $rootScope_$on_loader__finish();
        });
    }));

    describe('when no delay and freeze', function () {

        beforeEach(function () {
            var loaderEventManager = LoaderEventManager($rootScope, $timeout, {
                delay: 0,
                freeze: 0
            });
            loaderService = LoaderService(loaderEventManager);
        });

        describe('@startOne', function () {

            it('should emit loader:start once when called once', function () {
                loaderService.startOne();
                $rootScope_$on_loader__start.should.have.been.called.once;
            });

            it('should emit loader:start once when called times', function () {
                loaderService.startOne();
                loaderService.startOne();
                loaderService.startOne();
                $rootScope_$on_loader__start.should.have.been.called.once;
            });
        });

        describe('@finishOne', function () {

            it('should not emit loader:finish when called once', function () {
                loaderService.finishOne();
                expect($rootScope_$on_loader__finish).to.be.not.called;
            });

            describe('when @startOne called once and ', function () {
                beforeEach(function () {
                    loaderService.startOne();
                });

                it('should emit loader:finish once when called once', function () {
                    loaderService.finishOne();
                    $rootScope_$on_loader__start.should.have.been.called.once;
                    $rootScope_$on_loader__finish.should.have.been.called.once;
                });
            });

            describe('when @startOne called times', function () {
                beforeEach(function () {
                    loaderService.startOne();
                    loaderService.startOne();
                    loaderService.startOne();
                });

                it('should emit loader:finish on $rootScope once when called', function () {
                    loaderService.finishOne();
                    loaderService.finishOne();
                    loaderService.finishOne();
                    $rootScope_$on_loader__finish.should.have.been.called.once;
                });
            });
        });
    });
});