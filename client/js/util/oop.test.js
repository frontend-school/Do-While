var oop = require('./oop');

describe('oop', function () {
    it('should contains inherits function', function () {
        expect(oop.inherits).to.be.a('function');
    });

    describe('inherits', function () {
        var extended,
            Base, Extended;

        beforeEach(function () {

            Base = function (a) {
                this.a = a;
            };

            Extended = function () {
                Base.call(this, 0);
            };

            oop.inherits(Extended, Base);

            extended = new Extended();
        });


        it('should instanceof by base class', function () {
            expect(extended instanceof Base).to.be.true;
        });

        it('should has inherited property', function () {
            expect(extended.a).to.be.defined;
        });

        it('should has inherited property as own', function () {
            expect(extended.hasOwnProperty('a')).to.be.true;
        });
    });
});