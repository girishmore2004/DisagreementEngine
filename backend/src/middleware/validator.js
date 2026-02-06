import Joi from 'joi';

export const validateAnalysisRequest = (req, res, next) => {
  const schema = Joi.object({
    userInput: Joi.string()
      .min(10)
      .max(1000)
      .required()
      .messages({
        'string.min': 'Input must be at least 10 characters',
        'string.max': 'Input must not exceed 1000 characters',
        'any.required': 'userInput is required'
      }),
    
    challengeLevel: Joi.string()
      .valid('soft', 'strong')
      .default('soft')
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  req.validatedData = value;
  next();
};