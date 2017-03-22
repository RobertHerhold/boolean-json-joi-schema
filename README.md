# boolean-json-joi-schema

[![NPM](https://nodei.co/npm/boolean-json-joi-schema.png)](https://npmjs.org/package/boolean-json-joi-schema)

This package is a [Joi](https://github.com/hapijs/joi) port of [boolean-json-schema](https://github.com/kemitchell/boolean-json-schema.json). It exports a Joi schema that can be used to validate boolean JSON expressions.

The simplest valid expression is just a variable name:

```javascript
const schema = require('boolean-json-joi-schema');
const Joi = require('joi');

Joi.validate('myVar', schema, function(err) {
    expect(err).to.be.null;
});
```

Per the [original](https://github.com/kemitchell/boolean-json-schema.json), the schema permits negation, conjunction, disjunction, and arbitrary combinations:

```javascript
{ not: 'x' }

{ and: [ 'x', 'y' ] }

{ or: [ 'x', 'y' ] }

{ and: [ { or: [ 'x', 'y' ] }, { not: 'z' } ] }
```

Conjunctions and disjunctions must have at least two operands:

```javascript
{ and: [ 'x' ]} // INVALID 🚫
{ and: [ 'x', 'y', 'z' ]} // VALID ✅

{ or: [ 'x' ]} // INVALID 🚫
{ or: [ 'x', 'y', 'z' ]} // VALID ✅
```
