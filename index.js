const Joi = require('joi');

const variable = Joi.string().min(1);

let expression;

const disjunction = Joi.object().keys({
    or: Joi.array().items(Joi.lazy(() => expression)).min(2)
});

const conjunction = Joi.object().keys({
    and: Joi.array().items(Joi.lazy(() => expression)).min(2)
});

const negation = Joi.object().keys({
    not: Joi.lazy(() => expression)
});

expression = Joi.alternatives().try(variable, disjunction, conjunction, negation);

module.exports = expression;
