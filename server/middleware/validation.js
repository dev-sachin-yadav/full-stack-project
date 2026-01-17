const { body, validationResult, param } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  };
};

// Validation rules
const registerValidation = validate([
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase, one lowercase, and one number'),
  body('firstName').optional().trim(),
  body('lastName').optional().trim()
]);

const loginValidation = validate([
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
]);

const taskValidation = validate([
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('description').optional().isLength({ max: 1000 }),
  body('status').optional().isIn(['pending', 'in-progress', 'completed', 'archived']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('dueDate').optional().isISO8601().toDate(),
  body('tags').optional().isArray()
]);

const idValidation = validate([
  param('id').isMongoId().withMessage('Invalid ID format')
]);

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  taskValidation,
  idValidation
};