var example = require('./example');

describe("example", function () {
    it("should exports object", function () {
        expect(example).to.be.a('object');
    });

    it("should has function sayHello", function () {
        expect(example.sayHello).to.be.a('function');
    });

    describe(":sayHello", function () {
        it("should return hello when no args", function () {
			expect(example.sayHello()).to.equal("hello");
        });

        it("should return 'hello world' when 'world' passed", function () {
			expect(example.sayHello("world")).to.equal("hello world");
        });
    });
});