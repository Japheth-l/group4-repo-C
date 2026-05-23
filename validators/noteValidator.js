const Joi = require('joi');

const noteSchema = Joi.object({
  text: Joi.string().min(3).required().messages({
    'string.min': 'Text must be at least 3 characters',
    'string.empty': 'Text is required',
    'any.required': 'Text is required'
  })
});

module.exports = noteSchema;