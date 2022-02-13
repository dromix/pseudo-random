import { check } from 'express-validator';

export class ValidatorService {
  validateInitialParams() {
    return [
      check('probability').notEmpty().withMessage('Probability is required'),
      check('probability')
        .custom((val) => typeof val === 'number' && val >= 0 && val <= 1)
        .withMessage('Probability should be a number between 0 and 1'),
      check('probability')
        .notEmpty()
        .custom((val) => val > 5),
      check('value').notEmpty().withMessage('Value is required'),
      check('value')
        .custom((val) => typeof val === 'boolean')
        .withMessage('Value should be true or false'),

      check('iterations')
        .custom((val) => !val || typeof val === 'number')
        .withMessage('Iterations should be a number'),
    ];
  }
}

export const validatorService = new ValidatorService();
