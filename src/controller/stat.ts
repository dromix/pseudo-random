import express from 'express';
import { validationResult } from 'express-validator';
import { IProbabilityRequest } from '../interface';
import { logger } from '../service/logger';
import { statGeneratorService } from '../service/stat-generator';
import { validatorService } from '../service/validator';

const statRouter = express.Router();
statRouter.post(
  '/',
  validatorService.validateInitialParams(),
  (req: IProbabilityRequest, res: express.Response) => {
    logger.info('body', { ...req.body });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);

      return;
    }

    const { probability = 0, value = false, iterations = 1000 } = req.body;
    const statistics = statGeneratorService.generateProbabilityStat(
      probability,
      value,
      iterations
    );

    logger.info('response', statistics);
    res.json(statistics);
  }
);

export { statRouter };
