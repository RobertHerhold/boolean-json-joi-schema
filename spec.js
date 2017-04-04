const Joi = require('joi');
const expect = require('chai').expect;
const schema = require('./index');

describe('Joi Schema', function() {
    describe('Variable validation', function() {
        it('should allow a string variable', function() {
            Joi.validate('foo', schema, function(err) {
                expect(err).to.be.null;
            });
        });

        it('should not allow an empty string', function() {
            Joi.validate('', schema, function(err) {
                // Index 0 b/c the `variable` schema is checked first
                expect(err.details[0].message).to.equal('"value" is not allowed to be empty');
            });
        });

        it('should not allow anything other than a string', function() {
            Joi.validate(1, schema, function(err) {
                // Index 0 b/c the `variable` schema is checked first
                expect(err.details[0].message).to.equal('"value" must be a string');
            });
        });
    });

    describe('Disjunction validation', function() {
        it('should allow a disjunction object', function() {
            Joi.validate({ or: ['a', 'b'] }, schema, function(err) {
                expect(err).to.be.null;
            });
        });

        it('should not allow a disjunction with fewer than 2 elements', function() {
            Joi.validate({ or: ['a'] }, schema, function(err) {
                // Index 1 b/c the `disjunction` schema is checked second
                expect(err.details[1].message).to.equal('"or" must contain at least 2 items');
            });
        });

        it('should not allow a disjunction with a sparse array', function() {
            Joi.validate({ or: ['a', undefined] }, schema, function(err) {
                // Index 1 b/c the `disjunction` schema is checked second
                expect(err.details[1].message).to.equal('"or" must not be a sparse array');
            });
        });

        it('should not allow keys other than "or"', function() {
            Joi.validate({ foo: ['a'] }, schema, function(err) {
                // Index 1 b/c the `disjunction` schema is checked second
                expect(err.details[1].message).to.equal('"foo" is not allowed');
            });
        });
    });

    describe('Conjunction validation', function() {
        it('should allow a conjunction object', function() {
            Joi.validate({ and: ['a', 'b'] }, schema, function(err) {
                expect(err).to.be.null;
            });
        });

        it('should not allow a conjunction with fewer than 2 elements', function() {
            Joi.validate({ and: ['a', undefined] }, schema, function(err) {
                // Index 2 b/c the `conjunction` schema is checked third
                expect(err.details[2].message).to.equal('"and" must not be a sparse array');
            });
        });

        it('should not allow a conjunction with any undefined values', function() {
            Joi.validate({ and: ['a'] }, schema, function(err) {
                // Index 2 b/c the `conjunction` schema is checked third
                expect(err.details[2].message).to.equal('"and" must contain at least 2 items');
            });
        });

        it('should not allow keys other than "or"', function() {
            Joi.validate({ foo: ['a'] }, schema, function(err) {
                // Index 2 b/c the `conjunction` schema is checked third
                expect(err.details[2].message).to.equal('"foo" is not allowed');
            });
        });
    });

    describe('Negation validation', function() {
        it('should allow a negation object', function() {
            Joi.validate({ not: 'a' }, schema, function(err) {
                expect(err).to.be.null;
            });
        });

        it('should not allow a negation with an invalid expression', function() {
            Joi.validate({ not: { foo: 'bar' } }, schema, function(err) {
                expect(err).to.not.be.null;
            });
        });
    });
});
