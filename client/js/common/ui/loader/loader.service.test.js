var _loaderService_ = require('./loader.service');

describe('LoaderService', function () {
    var loaderService;
    var $rootScope_$on_loader__start,
        $rootScope_$on_loader__finish;

    beforeEach(function () {
        $rootScope_$on_loader__start = sinon.spy();
        $rootScope_$on_loader__finish = sinon.spy();
        var $rootScope = {
            $emit: function (eventName) {
                if (eventName === 'loader:start')
                    $rootScope_$on_loader__start();
                else if (eventName === 'loader:finish')
                    $rootScope_$on_loader__finish();
            }
        };
        loaderService = _loaderService_($rootScope);
    });

    describe('startOne', function () {

        it('should be function', function () {
            expect(loaderService.startOne).to.be.function;
        });

        it('should emit loader:start on $rootScope once when called once', function () {
            loaderService.startOne();
            expect($rootScope_$on_loader__start).to.be.called.once;
        });

        it('should emit loader:start on $rootScope once when called times', function () {
            loaderService.startOne();
            loaderService.startOne();
            loaderService.startOne();
            expect($rootScope_$on_loader__start).to.be.called.once;
        });
    });

    describe('finishOne', function () {
        it('should be function', function () {
            expect(loaderService.finishOne).to.be.function;
        });

        it('should not emit loader:finish on $rootScope when called once', function () {
            loaderService.finishOne();
            expect($rootScope_$on_loader__finish).to.be.not.called;
        });

        describe('when startOne called once and ', function () {
            beforeEach(function () {
                loaderService.startOne();
            });

            it('should emit loader:finish on $rootScope once when called once', function () {
                loaderService.finishOne();
                expect($rootScope_$on_loader__start).to.be.called.once;
                expect($rootScope_$on_loader__finish).to.be.called.once;
            });
        });

        describe('when startOne called times', function () {
            beforeEach(function () {
                loaderService.startOne();
                loaderService.startOne();
                loaderService.startOne();
            });

            it('should emit loader:finish on $rootScope once when called', function () {
                loaderService.finishOne();
                loaderService.finishOne();
                loaderService.finishOne();
                expect($rootScope_$on_loader__start).to.be.called.once;
                expect($rootScope_$on_loader__finish).to.be.called.once;
            });
        });
    });
});